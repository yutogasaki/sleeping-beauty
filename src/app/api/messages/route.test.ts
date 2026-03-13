import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import {
  MESSAGE_SUBMISSION_COOKIE_NAME,
  MESSAGE_SUBMISSION_COOLDOWN_MS,
} from "@/lib/messageSubmission";

import { POST } from "./route";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

const cookiesMock = vi.mocked(cookies);
const createClientMock = vi.mocked(createClient);

const originalEnv = { ...process.env };

function createRequest(payload: Record<string, unknown>) {
  return new Request("http://localhost/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

function mockCookieStore(value?: string) {
  cookiesMock.mockResolvedValue({
    get: vi.fn().mockReturnValue(value ? { value } : undefined),
  } as never);
}

describe("POST /api/messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    mockCookieStore();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("rejects invalid submissions with field errors", async () => {
    const response = await POST(
      createRequest({
        name: "",
        role: "",
        message: "",
        color: "green",
      }),
    );

    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body).toMatchObject({
      accepted: false,
      message: "入力内容をご確認ください",
      fieldErrors: {
        name: "お名前を入力してください",
        message: "意気込みメッセージを入力してください",
        color: "光の粒の色を選択してください",
      },
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("accepts honeypot submissions without touching persistence", async () => {
    const response = await POST(
      createRequest({
        name: "spam",
        role: "",
        message: "spam",
        color: "yellow",
        website: "https://spam.example.com",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ accepted: true });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("blocks rapid repeat submissions using the cooldown cookie", async () => {
    mockCookieStore(String(Date.now() - MESSAGE_SUBMISSION_COOLDOWN_MS + 1_000));

    const response = await POST(
      createRequest({
        name: "Maria",
        role: "Aurora",
        message: "がんばります。",
        color: "pink",
      }),
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toMatchObject({
      accepted: false,
      message: "少し時間をおいてから、もう一度お送りください",
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("returns 503 when Supabase env vars are unavailable", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const response = await POST(
      createRequest({
        name: "Maria",
        role: "Aurora",
        message: "本番も笑顔で踊りきります。",
        color: "pink",
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      accepted: false,
      message: "現在は投稿受付の準備中です。時間をおいて再度お試しください。",
    });
  });

  it("persists valid submissions and sets a cooldown cookie", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";

    const insertMock = vi.fn().mockResolvedValue({ error: null });
    const fromMock = vi.fn().mockReturnValue({
      insert: insertMock,
    });

    createClientMock.mockReturnValue({
      from: fromMock,
    } as never);

    const response = await POST(
      createRequest({
        name: "Maria",
        role: "Aurora",
        message: "本番も笑顔で踊りきります。",
        color: "pink",
      }),
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ accepted: true });
    expect(createClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    expect(fromMock).toHaveBeenCalledWith("messages");
    expect(insertMock).toHaveBeenCalledWith([
      {
        sender_name: "Maria（Aurora）",
        content: "本番も笑顔で踊りきります。",
        color_theme: "pink",
      },
    ]);
    expect(response.cookies.get(MESSAGE_SUBMISSION_COOKIE_NAME)?.value).toBeTruthy();
  });
});
