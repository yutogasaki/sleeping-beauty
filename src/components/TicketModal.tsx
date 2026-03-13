"use client";

import { AnimatePresence, motion } from "framer-motion";

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
      border: "1px solid rgba(212, 175, 55, 0.5)",
      background:
        "linear-gradient(135deg, rgba(212, 175, 55, 0.28) 0%, rgba(251, 248, 204, 0.12) 100%)",
      color: "var(--color-accent-light)",
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
    border: "1px solid rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.04)",
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
            backgroundColor: "rgba(5, 10, 17, 0.9)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            transformStyle: "preserve-3d",
            perspective: "1000px",
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
                "linear-gradient(135deg, rgba(30, 62, 98, 0.96) 0%, rgba(11, 25, 44, 0.98) 100%)",
              borderRadius: "15px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(212, 175, 55, 0.3)",
              overflow: "hidden",
              position: "relative",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              style={{
                height: "40px",
                background: "linear-gradient(to right, #D4AF37, #FBF8CC, #D4AF37)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#050a11",
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
                    "radial-gradient(circle, rgba(212,175,55,0.05) 1px, transparent 1px)",
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
                  borderTop: "1px dashed rgba(212, 175, 55, 0.3)",
                  borderBottom: "1px dashed rgba(212, 175, 55, 0.3)",
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
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
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
                    color: "var(--color-accent-light)",
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
                      "repeating-linear-gradient(90deg, rgba(251,248,204,0.92) 0 3px, transparent 3px 6px, rgba(212,175,55,0.88) 6px 8px, transparent 8px 11px)",
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
                backgroundColor: "rgba(5, 10, 17, 0.9)",
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
                backgroundColor: "rgba(5, 10, 17, 0.9)",
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
