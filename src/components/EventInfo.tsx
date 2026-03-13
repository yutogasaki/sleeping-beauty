"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EVENT_DETAILS } from "../lib/eventDetails";
import TicketModal from "./TicketModal";

export default function EventInfo() {
    const [isTicketOpen, setIsTicketOpen] = useState(false);

    return (
        <section
            id="event-info"
            className="section-padding flex-center"
            style={{ backgroundColor: "var(--color-primary)", position: "relative", zIndex: 10, scrollMarginTop: "2rem" }}
        >
            <div className="container" style={{ width: "100%", maxWidth: "800px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel"
                    style={{ padding: "3rem 2rem", border: "1px solid var(--color-accent-glow)" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
                            公演情報
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>
                            INFORMATION
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {/* Date & Time */}
                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-accent-light)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>日時</h4>
                            <p style={{ fontSize: "1.2rem" }}>{EVENT_DETAILS.dateLabel}</p>
                            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
                                {EVENT_DETAILS.doorsAndShowLabel}
                            </p>
                        </div>

                        {/* Location */}
                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-accent-light)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>場所</h4>
                            <p style={{ fontSize: "1.2rem" }}>{EVENT_DETAILS.venueName}</p>
                            <a
                                href={EVENT_DETAILS.accessUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--color-accent)", fontSize: "0.9rem", textDecoration: "underline", display: "inline-block", marginTop: "0.5rem" }}
                            >
                                会場アクセスはこちら
                            </a>
                        </div>

                        {/* Program */}
                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
                            <h4 style={{ color: "var(--color-accent-light)", fontSize: "1.1rem", marginBottom: "1rem" }}>構成（プログラム）</h4>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                <li style={{ marginBottom: "0.8rem", display: "flex", gap: "1rem" }}>
                                    <span style={{ color: "var(--color-accent-light)", minWidth: "100px" }}>Chapter 1</span>
                                    <span>小品集</span>
                                </li>
                                <li style={{ marginBottom: "0.8rem", display: "flex", gap: "1rem" }}>
                                    <span style={{ color: "var(--color-accent-light)", minWidth: "100px" }}>Chapter 2</span>
                                    <span>小品集</span>
                                </li>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <span style={{ color: "var(--color-accent)", minWidth: "100px", fontWeight: "bold" }}>Chapter 3</span>
                                    <span style={{ color: "var(--color-accent)", fontWeight: "bold" }}>眠れる森の美女</span>
                                </li>
                            </ul>
                        </div>

                        {/* Studio Info */}
                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>主催</p>
                            <p style={{ fontSize: "1.3rem", fontFamily: "var(--font-heading)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                                AYAMI BALLET STUDIO
                            </p>
                            <button
                                onClick={() => setIsTicketOpen(true)}
                                className="btn-primary"
                                style={{ display: "inline-block", fontSize: "0.9rem", padding: "0.75rem 2rem", marginBottom: "1rem" }}
                            >
                                来場用デジタルチケット
                            </button>
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

            <TicketModal isOpen={isTicketOpen} onClose={() => setIsTicketOpen(false)} />
        </section>
    );
}
