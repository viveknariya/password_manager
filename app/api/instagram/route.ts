import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, InstagramAccount, User } from "@/lib/types";
import { encrypt, decrypt } from "@/lib/crypto";

export const GET = withAuth(async (request: NextRequest) => {
  try {
    const sql = getAdminClient();
    const email = request.headers.get("x-user-email");

    if (!email) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User info not found in request",
        },
        { status: 401 },
      );
    }

    // Get user id first
    const [user] = await sql<User[]>`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const accounts = (
      await sql<InstagramAccount[]>`
      SELECT id, email, username, password, created_at, updated_at
      FROM instagram_accounts
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `
    ).map((account) => ({
      ...account,
      password: decrypt(account.password),
    }));

    return NextResponse.json<ApiResponse<InstagramAccount[]>>({
      success: true,
      message: "Instagram accounts fetched successfully",
      data: accounts,
    });
  } catch (error) {
    console.error("GET /api/instagram error:", error);
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

export const POST = withAuth(async (request: NextRequest) => {
  try {
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

    // Get user id
    const [user] = await sql<User[]>`
      SELECT id FROM users WHERE email = ${userEmail}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const encryptedPassword = encrypt(password);

    const [newAccount] = await sql<InstagramAccount[]>`
      INSERT INTO instagram_accounts (user_id, email, username, password)
      VALUES (${user.id}, ${accountEmail}, ${username}, ${encryptedPassword})
      RETURNING id, email, username, password, created_at, updated_at
    `;

    if (newAccount) {
      newAccount.password = decrypt(newAccount.password);
    }

    return NextResponse.json<ApiResponse<InstagramAccount>>({
      success: true,
      message: "Instagram account created successfully",
      data: newAccount,
    });
  } catch (error) {
    console.error("POST /api/instagram error:", error);
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
