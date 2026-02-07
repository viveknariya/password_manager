import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { ApiResponse, User, Otp } from "@/lib/types";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const sql = getAdminClient();

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Email and code are required" },
        { status: 400 },
      );
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Find the latest unused OTP for this email
    const otps = await sql<Otp[]>`
      SELECT * FROM otps
      WHERE email = ${email} AND code = ${hashedOtp} AND used = FALSE
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const otpDB = otps[0];

    if (!otpDB) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 },
      );
    }

    // Check if expired
    if (new Date() > new Date(otpDB.expires_at)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "OTP has expired" },
        { status: 401 },
      );
    }

    // Mark OTP as used
    await sql`
      UPDATE otps SET used = TRUE WHERE id = ${otpDB.id}
    `;

    // Ensure user exists in users table and get their ID
    const users = await sql<User[]>`
      INSERT INTO users (email)
      VALUES (${email})
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `;

    const user = users[0];

    // Sign JWT token
    const token = signToken({ id: user.id });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json<ApiResponse<{ token: string }>>(
      { success: true, message: "OTP verified successfully", data: { token } },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Failed to verify OTP" },
      { status: 500 },
    );
  }
}
