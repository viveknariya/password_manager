import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, InstagramAccount } from "@/lib/types";
import { encrypt, decrypt } from "@/lib/crypto";

export const GET = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const sql = getAdminClient();

    const accounts = (
      await sql<InstagramAccount[]>`
      SELECT id, email, username, password, created_at, updated_at
      FROM instagram_accounts
      WHERE user_id = ${userId}
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
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
  },
);

export const POST = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const { email: accountEmail, username, password } = await request.json();
    const sql = getAdminClient();

    const encryptedPassword = encrypt(password);

    const [newAccount] = await sql<InstagramAccount[]>`
      INSERT INTO instagram_accounts (user_id, email, username, password)
      VALUES (${userId}, ${accountEmail}, ${username}, ${encryptedPassword})
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
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
  },
);

export const PUT = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const {
      id,
      email: accountEmail,
      username,
      password,
    } = await request.json();
    const sql = getAdminClient();

    if (!id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Bad Request",
          error: "ID is required in payload",
        },
        { status: 400 },
      );
    }

    const encryptedPassword = encrypt(password);

    const [updatedAccount] = await sql<InstagramAccount[]>`
      UPDATE instagram_accounts
      SET 
        email = ${accountEmail},
        username = ${username},
        password = ${encryptedPassword},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id, email, username, password, created_at, updated_at
    `;

    if (updatedAccount) {
      updatedAccount.password = decrypt(updatedAccount.password);
    }

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
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
  },
);

export const DELETE = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const { id } = await request.json();
    const sql = getAdminClient();

    if (!id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Bad Request",
          error: "ID is required in payload",
        },
        { status: 400 },
      );
    }

    const [deletedAccount] = await sql<{ id: string }[]>`
      DELETE FROM instagram_accounts
      WHERE id = ${id} AND user_id = ${userId}
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
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
  },
);
