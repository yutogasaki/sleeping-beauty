"use client";

import { motion } from "framer-motion";
import { EVENT_DETAILS } from "../lib/eventDetails";
import { GUEST_ARTISTS } from "../lib/guestArtists";
import { PROGRAM_CHAPTERS, PROGRAM_NOTE } from "../lib/programDetails";

export default function EventInfo() {
    const hasTicketSalesUrl = EVENT_DETAILS.ticketSalesUrl.length > 0;

    return (
        <section
            id="event-info"
            className="section-padding flex-center ornament-section"
            style={{ position: "relative", zIndex: 10, scrollMarginTop: "2rem" }}
        >
            <div className="container" style={{ width: "100%", maxWidth: "960px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel"
                    style={{ padding: "3rem 2rem", border: "1px solid var(--color-line-strong)" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 className="section-heading-rule" style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
                            公演情報
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>
                            INFORMATION
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {/* Date & Time */}
                        <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-sage)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>日時</h4>
                            <p style={{ fontSize: "1.2rem" }}>{EVENT_DETAILS.dateLabel}</p>
                            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
                                {EVENT_DETAILS.doorsAndShowLabel}
                            </p>
                        </div>

                        {/* Location */}
                        <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-sage)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>場所</h4>
                            <p style={{ fontSize: "1.2rem" }}>{EVENT_DETAILS.venueName}</p>
                            <a
                                href={EVENT_DETAILS.accessUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--color-accent)", fontSize: "0.9rem", textDecoration: "underline", display: "inline-block", marginTop: "0.5rem" }}
                            >
                                Googleマップで会場を見る
                            </a>
                        </div>

                        {/* Guests */}
                        <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-sage)", fontSize: "1.1rem", marginBottom: "1rem" }}>ゲスト</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                                {GUEST_ARTISTS.map((guest, index) => (
                                    <div
                                        key={guest.id}
                                        style={{
                                            paddingBottom: index === GUEST_ARTISTS.length - 1 ? 0 : "0.9rem",
                                            borderBottom:
                                                index === GUEST_ARTISTS.length - 1
                                                    ? "none"
                                                    : "1px solid rgba(var(--color-ink-rgb), 0.12)",
                                        }}
                                    >
                                        <p style={{ color: "var(--color-text)", fontSize: "1.05rem", fontFamily: "var(--font-heading)", marginBottom: "0.2rem" }}>
                                            {guest.name}
                                        </p>
                                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                            {guest.affiliation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Program */}
                        <div style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-sage)", fontSize: "1.1rem", marginBottom: "1rem" }}>構成（プログラム）</h4>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {PROGRAM_CHAPTERS.map((chapter) => (
                                    <li
                                        key={chapter.id}
                                        style={{
                                            padding: "0 0 1rem",
                                            borderBottom: "1px solid rgba(var(--color-ink-rgb), 0.12)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "block",
                                                color: chapter.featured ? "var(--color-accent)" : "var(--color-sage)",
                                                fontSize: "0.82rem",
                                                letterSpacing: "0.14em",
                                                marginBottom: "0.35rem",
                                                fontWeight: chapter.featured ? "bold" : undefined,
                                            }}
                                        >
                                            {chapter.chapterLabel}
                                        </span>
                                        <span
                                            style={{
                                                display: "block",
                                                color: chapter.featured ? "var(--color-accent)" : "var(--color-text)",
                                                fontSize: "1.05rem",
                                                marginBottom: "0.3rem",
                                                fontWeight: chapter.featured ? "bold" : undefined,
                                            }}
                                        >
                                            {chapter.title}
                                        </span>
                                        <span style={{ display: "block", color: "var(--color-text-muted)", fontSize: "0.92rem" }}>
                                            {chapter.summary}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", marginTop: "0.9rem" }}>
                                {PROGRAM_NOTE}
                            </p>
                        </div>

                        {/* Studio Info */}
                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>主催</p>
                            <p style={{ fontSize: "1.3rem", fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                                AYAMI BALLET STUDIO
                            </p>
                            {hasTicketSalesUrl ? (
                                <a
                                    href={EVENT_DETAILS.ticketSalesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ display: "inline-block", fontSize: "0.9rem", padding: "0.75rem 2rem", marginBottom: "0.75rem", textDecoration: "none" }}
                                >
                                    チケット販売サイトへ
                                </a>
                            ) : (
                                <span
                                    className="btn-primary"
                                    style={{
                                        display: "inline-block",
                                        fontSize: "0.9rem",
                                        padding: "0.75rem 2rem",
                                        marginBottom: "0.75rem",
                                        cursor: "default",
                                        opacity: 0.86,
                                    }}
                                >
                                    {EVENT_DETAILS.ticketSalesNotice}
                                </span>
                            )}
                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", marginBottom: "1rem" }}>
                                販売サイトは準備が整い次第こちらに掲載します。
                            </p>
                            <br />
                            <a
                                href={EVENT_DETAILS.studioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", textDecoration: "underline" }}
                            >
                                スタジオ公式サイトへ
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
