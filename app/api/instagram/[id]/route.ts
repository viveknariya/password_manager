import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, InstagramAccount, User } from "@/lib/types";

export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    const { email: accountEmail, username, password } = await request.json();
    const sql = getAdminClient();
    const userEmail = request.headers.get("x-user-email");

    if (!userEmail) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User info not found in request",
        },
        { status: 401 },
      );
    }

    // Get user id and verify ownership
    const [user] = await sql<User[]>`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const [updatedAccount] = await sql<InstagramAccount[]>`
      UPDATE instagram_accounts
      SET 
        email = ${accountEmail},
        username = ${username},
        password = ${password},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id!} AND user_id = ${user.id}
      RETURNING id, email, username, password, created_at, updated_at
    `;

    if (!updatedAccount) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Account not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<InstagramAccount>>({
      success: true,
      message: "Instagram account updated successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.error("PUT /api/instagram/[id] error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: String(error),
      },
      { status: 500 },
    );
  }
});

export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    const sql = getAdminClient();
    const userEmail = request.headers.get("x-user-email");

    if (!userEmail) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User info not found in request",
        },
        { status: 401 },
      );
    }

    // Get user id and verify ownership
    const [user] = await sql<User[]>`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const [deletedAccount] = await sql<{ id: string }[]>`
      DELETE FROM instagram_accounts
      WHERE id = ${id!} AND user_id = ${user.id}
      RETURNING id
    `;

    if (!deletedAccount) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Account not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Instagram account deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/instagram/[id] error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: String(error),
      },
      { status: 500 },
    );
  }
});
