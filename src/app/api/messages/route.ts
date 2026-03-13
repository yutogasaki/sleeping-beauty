import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import {
  buildSenderName,
  MESSAGE_SUBMISSION_COOKIE_NAME,
  MESSAGE_SUBMISSION_COOLDOWN_MS,
  normalizeMessageSubmission,
  validateMessageSubmission,
} from "@/lib/messageSubmission";

export const dynamic = "force-dynamic";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getCooldownSeconds() {
  return Math.ceil(MESSAGE_SUBMISSION_COOLDOWN_MS / 1000);
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const now = Date.now();
  const previousSubmission = Number(
    cookieStore.get(MESSAGE_SUBMISSION_COOKIE_NAME)?.value ?? "0",
  );

  if (
    Number.isFinite(previousSubmission) &&
    previousSubmission > 0 &&
    now - previousSubmission < MESSAGE_SUBMISSION_COOLDOWN_MS
  ) {
    return NextResponse.json(
      {
        accepted: false,
        message: "少し時間をおいてから、もう一度お送りください",
      },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  const input = normalizeMessageSubmission({
    name: asString(body?.name),
    role: asString(body?.role),
    message: asString(body?.message),
    color: asString(body?.color),
    website: asString(body?.website),
  });

  if (input.website) {
    return NextResponse.json({ accepted: true });
  }

  const validation = validateMessageSubmission(input);

  if (!validation.ok) {
    return NextResponse.json(
      {
        accepted: false,
        message: validation.message,
        fieldErrors: validation.fieldErrors,
      },
      { status: 422 },
    );
  }

  const supabase = getServerSupabase();

  if (!supabase) {
    return NextResponse.json(
      {
        accepted: false,
        message: "現在は投稿受付の準備中です。時間をおいて再度お試しください。",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("messages").insert([
    {
      sender_name: buildSenderName(validation.data),
      content: validation.data.message,
      color_theme: validation.data.color,
    },
  ]);

  if (error) {
    console.error("Error inserting message:", error);

    return NextResponse.json(
      {
        accepted: false,
        message: "送信に失敗しました。時間をおいて再度お試しください。",
      },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ accepted: true });
  response.cookies.set({
    name: MESSAGE_SUBMISSION_COOKIE_NAME,
    value: String(now),
    httpOnly: true,
    maxAge: getCooldownSeconds(),
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
