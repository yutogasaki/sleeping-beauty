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
            className="section-padding flex-center ornament-section storybook-stage-section"
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
                        <div className="event-program-summary" style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-sage)", fontSize: "1.1rem", marginBottom: "1rem" }}>構成（プログラム）</h4>
                            <ul className="event-program-list" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {PROGRAM_CHAPTERS.map((chapter) => (
                                    <li
                                        key={chapter.id}
                                        className="event-program-chapter"
                                        style={{
                                            padding: "0 0 1rem",
                                            borderBottom: "1px solid rgba(var(--color-ink-rgb), 0.12)",
                                        }}
                                    >
                                        <span
                                            className="event-program-label"
                                            style={{
                                                display: "block",
                                                color: chapter.featured ? "var(--color-accent)" : "var(--color-sage)",
                                                fontSize: "0.82rem",
                                                letterSpacing: "0.08em",
                                                marginBottom: "0.35rem",
                                                fontWeight: chapter.featured ? 700 : 600,
                                            }}
                                        >
                                            {chapter.chapterLabel}
                                        </span>
                                        <span
                                            className="event-program-title"
                                            style={{
                                                display: "block",
                                                color: chapter.featured ? "var(--color-accent)" : "var(--color-text)",
                                                fontSize: "1.05rem",
                                                marginBottom: "0.3rem",
                                                fontWeight: chapter.featured ? 700 : 600,
                                            }}
                                        >
                                            {chapter.title}
                                        </span>
                                        <span className="event-program-summary-text" style={{ display: "block", color: "var(--color-text-muted)", fontSize: "0.92rem" }}>
                                            {chapter.summary}
                                        </span>
                                        {chapter.finale && (
                                            <div
                                                className="event-program-detail"
                                                style={{
                                                    marginTop: "0.85rem",
                                                    padding: "0.75rem 0 0.1rem 1rem",
                                                    borderLeft: `2px solid ${chapter.featured ? "var(--color-accent)" : "var(--color-sage)"}`,
                                                    textAlign: "left",
                                                }}
                                            >
                                                <span
                                                    className="event-program-detail-label"
                                                    style={{
                                                        display: "block",
                                                        color: "var(--color-text-muted)",
                                                        fontSize: "0.74rem",
                                                        letterSpacing: "0.08em",
                                                        marginBottom: "0.25rem",
                                                    }}
                                                >
                                                    主な演目
                                                </span>
                                                <span
                                                    className="event-program-detail-title"
                                                    style={{
                                                        display: "block",
                                                        color: "var(--color-text)",
                                                        fontSize: "1rem",
                                                        lineHeight: 1.65,
                                                        letterSpacing: "0.03em",
                                                        marginBottom: "0.25rem",
                                                    }}
                                                >
                                                    {chapter.finale.title}
                                                </span>
                                                <span
                                                    className="event-program-detail-performers"
                                                    style={{
                                                        display: "block",
                                                        color: "var(--color-text-muted)",
                                                        fontSize: "0.86rem",
                                                        lineHeight: 1.7,
                                                    }}
                                                >
                                                    {chapter.finale.performers}
                                                </span>
                                            </div>
                                        )}
                                        {chapter.principalCast && (
                                            <div
                                                className="event-program-detail"
                                                style={{
                                                    marginTop: "0.85rem",
                                                    padding: "0.75rem 0 0.1rem 1rem",
                                                    borderLeft: `2px solid ${chapter.featured ? "var(--color-accent)" : "var(--color-sage)"}`,
                                                    textAlign: "left",
                                                }}
                                            >
                                                <span
                                                    className="event-program-detail-label"
                                                    style={{
                                                        display: "block",
                                                        color: "var(--color-text-muted)",
                                                        fontSize: "0.74rem",
                                                        letterSpacing: "0.08em",
                                                        marginBottom: "0.45rem",
                                                    }}
                                                >
                                                    主な配役
                                                </span>
                                                <dl
                                                    className="event-program-cast-list"
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.32rem",
                                                        margin: 0,
                                                    }}
                                                >
                                                    {chapter.principalCast.map((cast) => (
                                                        <div
                                                            key={`${cast.role}-${cast.performer}`}
                                                            className="event-program-cast-row"
                                                            style={{
                                                                display: "grid",
                                                                gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
                                                                columnGap: "1rem",
                                                                paddingBottom: "0.32rem",
                                                                borderBottom: "1px solid rgba(var(--color-ink-rgb), 0.1)",
                                                            }}
                                                        >
                                                            <dt
                                                                className="event-program-cast-role"
                                                                style={{
                                                                    color: "var(--color-text)",
                                                                    fontSize: "0.92rem",
                                                                    lineHeight: 1.65,
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                {cast.role}
                                                            </dt>
                                                            <dd
                                                                className="event-program-cast-performer"
                                                                style={{
                                                                    color: "var(--color-text)",
                                                                    fontWeight: 600,
                                                                    fontSize: "0.92rem",
                                                                    lineHeight: 1.65,
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                {cast.performer}
                                                            </dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <p className="event-program-note" style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", marginTop: "0.9rem" }}>
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
