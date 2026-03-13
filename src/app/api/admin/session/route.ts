import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  getAdminSessionValue,
  isAdminPinConfigured,
  verifyAdminPin,
  verifyAdminSessionValue,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function sessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function GET() {
  const cookieStore = await cookies();
  const configured = isAdminPinConfigured();
  const authenticated =
    configured &&
    verifyAdminSessionValue(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  return NextResponse.json({ authenticated, configured });
}

export async function POST(request: Request) {
  const configured = isAdminPinConfigured();

  if (!configured) {
    return NextResponse.json(
      { authenticated: false, configured, error: "not_configured" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { pin?: unknown } | null;
  const pin = typeof body?.pin === "string" ? body.pin : "";

  if (!verifyAdminPin(pin)) {
    return NextResponse.json(
      { authenticated: false, configured, error: "invalid_pin" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ authenticated: true, configured });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionValue(),
    ...sessionCookieOptions(),
  });

  return response;
}

export function DELETE() {
  const response = NextResponse.json({
    authenticated: false,
    configured: isAdminPinConfigured(),
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    ...sessionCookieOptions(),
    expires: new Date(0),
    maxAge: 0,
  });

  return response;
}
