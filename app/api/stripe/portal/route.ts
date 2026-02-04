import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, User } from "@/lib/types";

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const sql = getAdminClient();
    const email = request.headers.get("x-user-email");

    if (!email) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User email not found in headers",
        },
        { status: 401 },
      );
    }

    // 1. Get user from database
    const [user] = await sql<User[]>`
      SELECT id, email, stripe_customer_id 
      FROM users 
      WHERE email = ${email}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    let customerId = user.stripe_customer_id;

    // 2. Create Stripe customer if it doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Update user in database
      await sql`
        UPDATE users 
        SET stripe_customer_id = ${customerId}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${user.id}
      `;
    }

    // 3. Create Stripe Portal Session
    // We'll use the origin from the request to build the return URL
    const returnUrl = new URL(
      "/user-billing",
      request.nextUrl.origin,
    ).toString();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return NextResponse.json<ApiResponse<{ url: string }>>({
      success: true,
      message: "Portal session created successfully",
      data: { url: session.url },
    });
  } catch (error: any) {
    console.error("POST /api/stripe/portal error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to create portal session",
        error: error.message,
      },
      { status: 500 },
    );
  }
});
