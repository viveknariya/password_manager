import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, AppAccount } from "@/lib/types";
import { encrypt, decrypt } from "@/lib/crypto";
import { availableAppIds } from "@/lib/apps";

const isValidAppId = (appId: string | null) =>
  !!appId && availableAppIds.includes(appId);

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const appId = new URL(request.url).searchParams.get("appId");
    if (appId && !availableAppIds.includes(appId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid app id" },
        { status: 400 },
      );
    }

    const sql = getAdminClient();

    const accounts = appId
      ? await sql<AppAccount[]>`
          SELECT id, user_id, app_id, email, username, password, created_at, updated_at
          FROM app_accounts
          WHERE user_id = ${userId} AND app_id = ${appId}
          ORDER BY created_at DESC
        `
      : await sql<AppAccount[]>`
          SELECT id, user_id, app_id, email, username, password, created_at, updated_at
          FROM app_accounts
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
        `;

    const decryptedAccounts = accounts.map((account) => ({
      ...account,
      password: decrypt(account.password),
    }));

    return NextResponse.json<ApiResponse<AppAccount[]>>({
      success: true,
      message: "App accounts fetched successfully",
      data: decryptedAccounts,
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
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { appId, email: accountEmail, username, password } =
      await request.json();

    if (!isValidAppId(appId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid app id" },
        { status: 400 },
      );
    }

    const sql = getAdminClient();
    const encryptedPassword = encrypt(password);

    const [newAccount] = await sql<AppAccount[]>`
      INSERT INTO app_accounts (user_id, app_id, email, username, password)
      VALUES (${userId}, ${appId}, ${accountEmail}, ${username}, ${encryptedPassword})
      RETURNING id, user_id, app_id, email, username, password, created_at, updated_at
    `;

    if (newAccount) {
      newAccount.password = decrypt(newAccount.password);
    }

    return NextResponse.json<ApiResponse<AppAccount>>({
      success: true,
      message: "App account created successfully",
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
});

export const PUT = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { id, appId, email: accountEmail, username, password } =
      await request.json();

    if (!id || !isValidAppId(appId)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Bad Request",
          error: "ID and app id are required in payload",
        },
        { status: 400 },
      );
    }

    const sql = getAdminClient();
    const encryptedPassword = encrypt(password);

    const [updatedAccount] = await sql<AppAccount[]>`
      UPDATE app_accounts
      SET
        email = ${accountEmail},
        username = ${username},
        password = ${encryptedPassword},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${userId} AND app_id = ${appId}
      RETURNING id, user_id, app_id, email, username, password, created_at, updated_at
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

    return NextResponse.json<ApiResponse<AppAccount>>({
      success: true,
      message: "App account updated successfully",
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
});

export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
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
      DELETE FROM app_accounts
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
      message: "App account deleted successfully",
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
});
