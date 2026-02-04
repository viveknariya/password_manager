import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { ApiResponse, User, Otp } from "@/lib/types";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

const sql = getAdminClient();

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Email and code are required" },
        { status: 400 }
      );
    }

    // Find the latest unused OTP for this email
    const otps = await sql<Otp[]>`
      SELECT * FROM otps
      WHERE email = ${email} AND code = ${otp} AND used = FALSE
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const otpDB = otps[0];

    if (!otpDB) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Check if expired
    if (new Date() > new Date(otpDB.expires_at)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "OTP has expired" },
        { status: 401 }
      );
    }

    // Mark OTP as used
    await sql`
      UPDATE otps SET used = TRUE WHERE id = ${otpDB.id}
    `;

    // Ensure user exists in users table
    await sql`
      INSERT INTO users (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    // Sign JWT token
    const token = signToken({ email: email });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json<ApiResponse<{ token: string }>>(
      { success: true, message: "OTP verified successfully", data: { token } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Failed to verify OTP", error: error.message },
      { status: 500 }
    );
  }
}
