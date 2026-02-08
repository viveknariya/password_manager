"server-only";

import { NextRequest, NextResponse } from "next/server";
import { sign, verify, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type Handler = (request: NextRequest) => Promise<NextResponse>;

export const signToken = (payload: string | object | Buffer) => {
  return sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const withAuth = (handler: Handler) => async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "No token found",
        error: "withoutauth",
      },
      { status: 200 },
    );
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === "string" || !decoded.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid token or missing user ID",
        error: "withoutauth",
      },
      { status: 200 },
    );
  }

  // Pass the user info down via headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", decoded.id);

  // Create a new request with updated headers without reusing NextRequest
  const baseRequest = new Request(request, { headers: requestHeaders });
  const authenticatedRequest = new NextRequest(baseRequest);

  // call the wrapped route handler
  return handler(authenticatedRequest);
};
