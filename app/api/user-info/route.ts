import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { withAuth } from "@/lib/auth";
import { ApiResponse, User } from "@/lib/types";

export const GET = withAuth(async (request: NextRequest) => {
  try {
    const sql = getAdminClient();
    const email = request.headers.get("x-user-email");
    
    if (!email) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Unauthorized", error: "User info not found in request" },
        { status: 401 }
      );
    }

    const [user] = await sql<User[]>`
      SELECT id, email, first_name, last_name, created_at, updated_at 
      FROM users 
      WHERE email = ${email}
    `;

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<User>>({
      success: true,
      message: "User info fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("GET /api/user-info error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const { firstName, lastName } = await request.json();
    const sql = getAdminClient();
    const email = request.headers.get("x-user-email");

    if (!email) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Unauthorized", error: "User info not found in request" },
        { status: 401 }
      );
    }

    const [updatedUser] = await sql<User[]>`
      UPDATE users 
      SET 
        first_name = ${firstName}, 
        last_name = ${lastName}, 
        updated_at = CURRENT_TIMESTAMP 
      WHERE email = ${email}
      RETURNING id, email, first_name, last_name, created_at, updated_at
    `;

    if (!updatedUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<User>>({
      success: true,
      message: "User info updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("POST /api/user-info error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
});
