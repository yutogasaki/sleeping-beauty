"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  MESSAGE_COLOR_OPTIONS,
  MESSAGE_LIMITS,
  type MessageSubmissionInput,
  validateMessageSubmission,
} from "../lib/messageSubmission";

type MessageSubmissionFormProps = {
  onSubmitted?: () => void;
};

export default function MessageSubmissionForm({ onSubmitted }: MessageSubmissionFormProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [showFieldErrors, setShowFieldErrors] = useState(false);
  const [formData, setFormData] = useState<MessageSubmissionInput>({
    name: "",
    role: "",
    message: "",
    color: "yellow",
    website: "",
  });

  const formValidation = validateMessageSubmission(formData);
  const fieldErrors = showFieldErrors ? formValidation.fieldErrors : {};
  const isSubmitDisabled = formStatus === "submitting" || !formValidation.ok;

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowFieldErrors(true);
    setFormError(null);

    if (!formValidation.ok) {
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as {
        accepted?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.accepted) {
        setFormError(result?.message ?? "エラーが発生しました。もう一度お試しください。");
        setFormStatus("idle");
        return;
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setFormError("通信に失敗しました。時間をおいて再度お試しください。");
      setFormStatus("idle");
      return;
    }

    setFormStatus("success");
    onSubmitted?.();
    setTimeout(() => {
      setFormStatus("idle");
      setFormError(null);
      setShowFieldErrors(false);
      setFormData({ name: "", role: "", message: "", color: "yellow", website: "" });
    }, 3000);
  };

  if (formStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-center"
        style={{ flexDirection: "column", minHeight: "320px", textAlign: "center" }}
      >
        <div style={{ width: "76px", height: "76px", marginBottom: "1rem", filter: "drop-shadow(0 8px 14px rgba(var(--color-gold-rgb), 0.28))", position: "relative" }}>
          <Image src="/images/light_particle.png" alt="" fill sizes="76px" style={{ objectFit: "contain" }} />
        </div>
        <h4 style={{ color: "var(--color-accent)", marginBottom: "0.8rem", fontSize: "1.4rem" }}>
          意気込みが森に宿りました
        </h4>
        <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>
          運営の確認後、<br />光の粒となって現れます。
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="message-submission-form">
      <h1>意気込みを灯す</h1>
      <p className="message-submission-form__intro">
        発表会に向けたひと言を送ってください。承認後、森に灯る光として公開ページに現れます。
      </p>

      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />

      {formError && (
        <p className="message-submission-form__error">
          {formError}
        </p>
      )}

      <div className="message-submission-form__field">
        <label>
          お名前（ニックネーム可）
          <span>{formData.name.length}/{MESSAGE_LIMITS.name}</span>
        </label>
        <input
          required
          type="text"
          maxLength={MESSAGE_LIMITS.name}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={Boolean(fieldErrors.name)}
        />
        {fieldErrors.name && <p>{fieldErrors.name}</p>}
      </div>

      <div className="message-submission-form__field">
        <label>
          演目・配役など（任意）
          <span>{formData.role.length}/{MESSAGE_LIMITS.role}</span>
        </label>
        <input
          type="text"
          maxLength={MESSAGE_LIMITS.role}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="例：ワルツ、妖精など"
          aria-invalid={Boolean(fieldErrors.role)}
        />
        {fieldErrors.role && <p>{fieldErrors.role}</p>}
      </div>

      <fieldset className="message-submission-form__colors">
        <legend>光の粒の色</legend>
        <div>
          {MESSAGE_COLOR_OPTIONS.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="color"
                value={option.value}
                checked={formData.color === option.value}
                onChange={() => setFormData({ ...formData, color: option.value })}
              />
              <span className={`message-submission-form__swatch message-submission-form__swatch--${option.value}`} aria-hidden="true" />
              {option.label}
            </label>
          ))}
        </div>
        {fieldErrors.color && <p>{fieldErrors.color}</p>}
      </fieldset>

      <div className="message-submission-form__field">
        <label>
          意気込みメッセージ
          <span>{formData.message.length}/{MESSAGE_LIMITS.message}</span>
        </label>
        <textarea
          required
          rows={4}
          maxLength={MESSAGE_LIMITS.message}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && <p>{fieldErrors.message}</p>}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={isSubmitDisabled}
      >
        {formStatus === "submitting" ? "送信中..." : "光の粒を送る"}
      </button>
    </form>
  );
}
