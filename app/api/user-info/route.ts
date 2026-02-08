import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, User } from "@/lib/types";

export const GET = withAuth(
  async (request: NextRequest, { userId }) => {
  try {
    const sql = getAdminClient();

    const [user] = await sql<User[]>`
      SELECT id, email, first_name, last_name, created_at, updated_at 
      FROM users 
      WHERE id = ${userId}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<User>>({
      success: true,
      message: "User info fetched successfully",
      data: user,
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
    const { firstName, lastName } = await request.json();
    const sql = getAdminClient();

    const [updatedUser] = await sql<User[]>`
      UPDATE users 
      SET 
        first_name = ${firstName}, 
        last_name = ${lastName}, 
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${userId}
      RETURNING id, email, first_name, last_name, created_at, updated_at
    `;

    if (!updatedUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<User>>({
      success: true,
      message: "User info updated successfully",
      data: updatedUser,
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
