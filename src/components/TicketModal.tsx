"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { EVENT_DETAILS, getGoogleCalendarUrl } from "../lib/eventDetails";

type TicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const googleCalendarUrl = getGoogleCalendarUrl();

function actionButtonStyle(variant: "primary" | "secondary") {
  if (variant === "primary") {
    return {
      display: "block",
      width: "100%",
      padding: "0.9rem 1rem",
      borderRadius: "10px",
      border: "1px solid rgba(var(--color-ink-rgb), 0.18)",
      background:
        "linear-gradient(135deg, var(--color-rose) 0%, #df9589 100%)",
      color: "var(--color-paper-light)",
      fontSize: "0.95rem",
      fontWeight: 600,
      textAlign: "center" as const,
      textDecoration: "none",
    };
  }

  return {
    display: "block",
    width: "100%",
    padding: "0.85rem 1rem",
      borderRadius: "10px",
    border: "1px solid var(--color-line)",
    backgroundColor: "rgba(var(--color-paper-light-rgb), 0.68)",
    color: "var(--color-text)",
    fontSize: "0.92rem",
    fontWeight: 500,
    textAlign: "center" as const,
    textDecoration: "none",
  };
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(var(--color-forest-dark-rgb), 0.88)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            transformStyle: "preserve-3d",
            perspective: "1000px",
            overflowY: "auto",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ rotateX: 90, opacity: 0, y: 50 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: -90, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            style={{
              width: "100%",
              maxWidth: "380px",
              background:
                "linear-gradient(135deg, rgba(var(--color-paper-light-rgb), 0.98) 0%, rgba(var(--color-paper-rgb), 0.98) 100%)",
              borderRadius: "15px",
              boxShadow:
                "0 20px 50px rgba(var(--color-forest-dark-rgb), 0.34), inset 0 0 0 1px var(--color-line-strong)",
              maxHeight: "calc(100dvh - 2rem)",
              overflowY: "auto",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              position: "relative",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="閉じる"
              onClick={onClose}
              style={{
                position: "absolute",
                top: "0.65rem",
                right: "0.65rem",
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                border: "1px solid rgba(var(--color-ink-rgb), 0.18)",
                backgroundColor: "rgba(var(--color-paper-light-rgb), 0.9)",
                color: "var(--color-text)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
                boxShadow: "0 8px 18px rgba(var(--color-forest-dark-rgb), 0.12)",
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div
              style={{
                height: "40px",
                background: "linear-gradient(to right, var(--color-sage), var(--color-accent-light), var(--color-rose))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "var(--color-ink)",
                  fontWeight: "bold",
                  letterSpacing: "0.2em",
                  fontSize: "0.9rem",
                }}
              >
                DIGITAL PASS
              </span>
            </div>

            <div style={{ padding: "2rem", textAlign: "center", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, rgba(var(--color-ink-rgb), 0.08) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                  pointerEvents: "none",
                }}
              />

              <h2
                style={{
                  color: "var(--color-text)",
                  fontSize: "1.7rem",
                  marginBottom: "0.5rem",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {EVENT_DETAILS.productionTitle}
              </h2>
              <p
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  marginBottom: "1.75rem",
                }}
              >
                {EVENT_DETAILS.studioTitle}
              </p>

              <div
                style={{
                  borderTop: "1px dashed rgba(var(--color-ink-rgb), 0.3)",
                  borderBottom: "1px dashed rgba(var(--color-ink-rgb), 0.3)",
                  padding: "1.4rem 0",
                  marginBottom: "1.5rem",
                }}
              >
                <DetailRow label="DATE" value={EVENT_DETAILS.ticketDateLabel} />
                <DetailRow label="DOORS" value={EVENT_DETAILS.doorsOpenLabel} />
                <DetailRow label="START" value={EVENT_DETAILS.startLabel} />
                <DetailRow label="SEAT" value={EVENT_DETAILS.seatLabel} isAccent />
              </div>

              <div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid var(--color-line)",
                  background:
                    "linear-gradient(180deg, rgba(var(--color-paper-light-rgb), 0.82) 0%, rgba(var(--color-paper-aged-rgb), 0.22) 100%)",
                }}
              >
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    marginBottom: "0.6rem",
                  }}
                >
                  PASS CODE
                </p>
                <p
                  style={{
                    color: "var(--color-accent)",
                    fontWeight: "bold",
                    letterSpacing: "0.18em",
                    marginBottom: "0.9rem",
                  }}
                >
                  {EVENT_DETAILS.passCode}
                </p>
                <div
                  aria-hidden="true"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(var(--color-ink-rgb), 0.62) 0 3px, transparent 3px 6px, rgba(var(--color-accent-rgb), 0.7) 6px 8px, transparent 8px 11px)",
                    opacity: 0.82,
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: "0.75rem" }}>
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={actionButtonStyle("primary")}
                >
                  Googleカレンダーに追加
                </a>
                <a
                  href="/api/calendar"
                  download={EVENT_DETAILS.calendarFilename}
                  style={actionButtonStyle("secondary")}
                >
                  Apple / Outlook 用 .ics を保存
                </a>
                <a
                  href={EVENT_DETAILS.accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={actionButtonStyle("secondary")}
                >
                  会場アクセスを確認
                </a>
              </div>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  marginTop: "1rem",
                }}
              >
                開場は {EVENT_DETAILS.doorsOpenLabel} です。来場前の予定登録やアクセス確認にご利用ください。
              </p>

              <button
                onClick={onClose}
                style={{
                  marginTop: "1.2rem",
                  background: "transparent",
                  border: "none",
                  color: "var(--color-text-muted)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                閉じる
              </button>
            </div>

            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "-10px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--color-forest-dark-rgb), 0.88)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "-10px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "rgba(var(--color-forest-dark-rgb), 0.88)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  label,
  value,
  isAccent = false,
}: {
  label: string;
  value: string;
  isAccent?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "0.9rem",
      }}
    >
      <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{label}</span>
      <span
        style={{
          color: isAccent ? "var(--color-accent-light)" : "var(--color-text)",
          fontWeight: "bold",
          fontSize: "1.02rem",
        }}
      >
        {value}
      </span>
    </div>
  );
}
