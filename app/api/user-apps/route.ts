import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { getAdminClient } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { availableAppIds } from "@/lib/apps";

const defaultAppId = "instagram";

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const sql = getAdminClient();
    let rows = await sql<{ app_id: string }[]>`
      SELECT app_id
      FROM user_apps
      WHERE user_id = ${userId}
      ORDER BY created_at ASC
    `;

    if (rows.length === 0 && availableAppIds.includes(defaultAppId)) {
      await sql`
        INSERT INTO user_apps (user_id, app_id)
        VALUES (${userId}, ${defaultAppId})
        ON CONFLICT DO NOTHING
      `;
      rows = await sql<{ app_id: string }[]>`
        SELECT app_id
        FROM user_apps
        WHERE user_id = ${userId}
        ORDER BY created_at ASC
      `;
    }

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      message: "User apps fetched successfully",
      data: rows.map((row) => row.app_id),
    });
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
});

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { appId } = await request.json();
    if (!appId || !availableAppIds.includes(appId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid app id" },
        { status: 400 },
      );
    }

    const sql = getAdminClient();
    await sql`
      INSERT INTO user_apps (user_id, app_id)
      VALUES (${userId}, ${appId})
      ON CONFLICT DO NOTHING
    `;

    const rows = await sql<{ app_id: string }[]>`
      SELECT app_id
      FROM user_apps
      WHERE user_id = ${userId}
      ORDER BY created_at ASC
    `;

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      message: "App added successfully",
      data: rows.map((row) => row.app_id),
    });
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
});

export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { appId } = await request.json();
    if (!appId || !availableAppIds.includes(appId)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid app id" },
        { status: 400 },
      );
    }

    const sql = getAdminClient();

    const [result] = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM app_accounts
      WHERE user_id = ${userId} AND app_id = ${appId}
    `;
    if (result?.count && result.count > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message:
            "You must delete all accounts linked to this app before removing it from the sidebar.",
        },
        { status: 400 },
      );
    }

    await sql`
      DELETE FROM user_apps
      WHERE user_id = ${userId} AND app_id = ${appId}
    `;

    const rows = await sql<{ app_id: string }[]>`
      SELECT app_id
      FROM user_apps
      WHERE user_id = ${userId}
      ORDER BY created_at ASC
    `;

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      message: "App removed successfully",
      data: rows.map((row) => row.app_id),
    });
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
});
