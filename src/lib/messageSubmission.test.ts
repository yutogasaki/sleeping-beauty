import {
  MESSAGE_LIMITS,
  buildSenderName,
  isMessageColor,
  normalizeMessageSubmission,
  validateMessageSubmission,
} from "./messageSubmission";

describe("messageSubmission", () => {
  it("normalizes whitespace while keeping message line breaks intact", () => {
    const normalized = normalizeMessageSubmission({
      name: "  Alice   Aurora ",
      role: "  Lilac   Fairy ",
      message: " first line \r\nsecond line  ",
      color: "yellow",
      website: " ",
    });

    expect(normalized).toEqual({
      name: "Alice Aurora",
      role: "Lilac Fairy",
      message: "first line \nsecond line",
      color: "yellow",
      website: "",
    });
  });

  it("accepts a valid submission", () => {
    const result = validateMessageSubmission({
      name: "Maria",
      role: "Aurora",
      message: "本番も笑顔で踊りきります。",
      color: "pink",
      website: "",
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.data.name).toBe("Maria");
      expect(result.data.role).toBe("Aurora");
      expect(result.data.color).toBe("pink");
    }
  });

  it("returns field errors for empty or invalid values", () => {
    const result = validateMessageSubmission({
      name: "",
      role: "x".repeat(MESSAGE_LIMITS.role + 1),
      message: "",
      color: "green",
      website: "",
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.fieldErrors).toEqual({
        name: "お名前を入力してください",
        role: `演目・配役は${MESSAGE_LIMITS.role}文字以内で入力してください`,
        message: "意気込みメッセージを入力してください",
        color: "光の粒の色を選択してください",
      });
    }
  });

  it("rejects overlong message content", () => {
    const result = validateMessageSubmission({
      name: "Aoi",
      role: "",
      message: "a".repeat(MESSAGE_LIMITS.message + 1),
      color: "pure",
      website: "",
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.fieldErrors.message).toBe(
        `メッセージは${MESSAGE_LIMITS.message}文字以内で入力してください`,
      );
    }
  });

  it("builds sender names with optional roles", () => {
    expect(buildSenderName({ name: "Yuki", role: "リラの精" })).toBe("Yuki（リラの精）");
    expect(buildSenderName({ name: "Sora", role: "" })).toBe("Sora");
  });

  it("exposes the supported color list", () => {
    expect(isMessageColor("yellow")).toBe(true);
    expect(isMessageColor("pure")).toBe(true);
    expect(isMessageColor("violet")).toBe(false);
  });
});
