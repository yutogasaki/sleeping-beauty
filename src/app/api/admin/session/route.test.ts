import { cookies } from "next/headers";

import { ADMIN_COOKIE_NAME, getAdminSessionValue } from "@/lib/adminAuth";

import { DELETE, GET, POST } from "./route";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

const cookiesMock = vi.mocked(cookies);
const originalEnv = { ...process.env };

function createRequest(payload: Record<string, unknown>) {
  return new Request("http://localhost/api/admin/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

function mockCookieStore(value?: string) {
  cookiesMock.mockResolvedValue({
    get: vi.fn().mockImplementation((name: string) => {
      if (name === ADMIN_COOKIE_NAME && value) {
        return { value };
      }

      return undefined;
    }),
  } as never);
}

describe("/api/admin/session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.ADMIN_PIN;
    mockCookieStore();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("reports unconfigured auth when ADMIN_PIN is missing", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      configured: false,
    });
  });

  it("reports authenticated when the session cookie matches the server pin", async () => {
    process.env.ADMIN_PIN = "2468";
    mockCookieStore(getAdminSessionValue());

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      configured: true,
    });
  });

  it("treats mismatched cookies as unauthenticated", async () => {
    process.env.ADMIN_PIN = "2468";
    mockCookieStore("wrong-value");

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      configured: true,
    });
  });

  it("rejects login when ADMIN_PIN is not configured", async () => {
    const response = await POST(createRequest({ pin: "2468" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      configured: false,
      error: "not_configured",
    });
  });

  it("rejects invalid admin pins", async () => {
    process.env.ADMIN_PIN = "2468";

    const response = await POST(createRequest({ pin: "0000" }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      configured: true,
      error: "invalid_pin",
    });
  });

  it("creates a signed session cookie for valid admin pins", async () => {
    process.env.ADMIN_PIN = "2468";

    const response = await POST(createRequest({ pin: "2468" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      configured: true,
    });
    expect(response.cookies.get(ADMIN_COOKIE_NAME)?.value).toBe(getAdminSessionValue());
    expect(response.headers.get("set-cookie")).toContain(`${ADMIN_COOKIE_NAME}=`);
  });

  it("clears the session cookie on logout", async () => {
    process.env.ADMIN_PIN = "2468";

    const response = DELETE();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      configured: true,
    });
    expect(response.headers.get("set-cookie")).toContain(`${ADMIN_COOKIE_NAME}=;`);
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});
