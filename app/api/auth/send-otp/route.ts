import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const sql = getAdminClient();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Store OTP in database
    await sql`
      INSERT INTO otps (email, code, expires_at)
      VALUES (${email}, ${otpCode}, ${expiresAt})
    `;

    // Send email with OTP code
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Your OTP Code</h2>
          <p>Use the following code to complete your login/signup:</p>
          <div style="font-size: 24px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px; display: inline-block;">
            ${otpCode}
          </div>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    });

    console.log(`OTP sent to ${email}`);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Failed to send OTP", error: error.message },
      { status: 500 }
    );
  }
}
