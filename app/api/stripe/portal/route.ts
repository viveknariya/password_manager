import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, User } from "@/lib/types";

export const POST = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const sql = getAdminClient();

    // 1. Get user from database
    const [user] = await sql<User[]>`
      SELECT id, email, stripe_customer_id 
      FROM users 
      WHERE id = ${userId}
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
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to create portal session",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
  },
);
