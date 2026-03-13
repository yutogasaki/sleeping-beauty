import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "sleeping_beauty_admin_session";

const ADMIN_SESSION_PAYLOAD = "authenticated";

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

function getAdminPin() {
  return process.env.ADMIN_PIN ?? "";
}

export function isAdminPinConfigured() {
  return getAdminPin().length > 0;
}

export function verifyAdminPin(pin: string) {
  const adminPin = getAdminPin();

  if (!adminPin) {
    return false;
  }

  return timingSafeEqual(sha256(pin), sha256(adminPin));
}

export function getAdminSessionValue() {
  const adminPin = getAdminPin();

  if (!adminPin) {
    return "";
  }

  const signature = createHmac("sha256", adminPin)
    .update(ADMIN_SESSION_PAYLOAD)
    .digest("hex");

  return `${ADMIN_SESSION_PAYLOAD}.${signature}`;
}

export function verifyAdminSessionValue(value: string | undefined) {
  const expectedValue = getAdminSessionValue();

  if (!value || !expectedValue) {
    return false;
  }

  return timingSafeEqual(sha256(value), sha256(expectedValue));
}
