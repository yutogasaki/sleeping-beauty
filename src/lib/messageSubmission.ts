export const MESSAGE_COLOR_OPTIONS = [
  { value: "yellow", label: "黄金" },
  { value: "pink", label: "桜色" },
  { value: "blue", label: "蒼穹" },
  { value: "pure", label: "純白" },
] as const;

export type MessageColor = (typeof MESSAGE_COLOR_OPTIONS)[number]["value"];

export type MessageSubmissionInput = {
  name: string;
  role: string;
  message: string;
  color: string;
  website?: string;
};

export type MessageFieldErrors = Partial<
  Record<"name" | "role" | "message" | "color", string>
>;

export const MESSAGE_LIMITS = {
  name: 24,
  role: 32,
  message: 140,
} as const;

export const MESSAGE_SUBMISSION_COOKIE_NAME =
  "sleeping_beauty_message_last_submission";
export const MESSAGE_SUBMISSION_COOLDOWN_MS = 30_000;

function collapseInlineWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeMessageSubmission(input: MessageSubmissionInput) {
  return {
    name: collapseInlineWhitespace(input.name),
    role: collapseInlineWhitespace(input.role),
    message: input.message.replace(/\r\n/g, "\n").trim(),
    color: input.color,
    website: (input.website ?? "").trim(),
  };
}

export function isMessageColor(value: string): value is MessageColor {
  return MESSAGE_COLOR_OPTIONS.some((option) => option.value === value);
}

export function buildSenderName(input: { name: string; role: string }) {
  return input.role ? `${input.name}（${input.role}）` : input.name;
}

export function validateMessageSubmission(input: MessageSubmissionInput) {
  const normalized = normalizeMessageSubmission(input);
  const fieldErrors: MessageFieldErrors = {};

  if (!normalized.name) {
    fieldErrors.name = "お名前を入力してください";
  } else if (normalized.name.length > MESSAGE_LIMITS.name) {
    fieldErrors.name = `お名前は${MESSAGE_LIMITS.name}文字以内で入力してください`;
  }

  if (normalized.role.length > MESSAGE_LIMITS.role) {
    fieldErrors.role = `演目・配役は${MESSAGE_LIMITS.role}文字以内で入力してください`;
  }

  if (!normalized.message) {
    fieldErrors.message = "意気込みメッセージを入力してください";
  } else if (normalized.message.length > MESSAGE_LIMITS.message) {
    fieldErrors.message = `メッセージは${MESSAGE_LIMITS.message}文字以内で入力してください`;
  }

  if (!isMessageColor(normalized.color)) {
    fieldErrors.color = "光の粒の色を選択してください";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      fieldErrors,
      message: "入力内容をご確認ください",
    };
  }

  return {
    ok: true as const,
    data: {
      ...normalized,
      color: normalized.color,
    },
    fieldErrors,
  };
}
