"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROGRAM_CHAPTERS, PROGRAM_NOTE } from "../lib/programDetails";

const CARD_WIDTH = 300;
const CARD_GAP = 32;

export default function ProgramCarousel() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -((CARD_WIDTH + CARD_GAP) * (PROGRAM_CHAPTERS.length - 1))]
    );

    return (
        <section
            id="program"
            ref={targetRef}
            className="section-padding"
            style={{
                height: `${120 + PROGRAM_CHAPTERS.length * 40}vh`,
                backgroundColor: "var(--color-primary)",
                position: "relative",
                zIndex: 10,
                scrollMarginTop: "2rem",
                borderTop: "1px solid rgba(var(--color-accent-rgb), 0.24)",
                borderBottom: "1px solid rgba(var(--color-accent-rgb), 0.24)",
            }}
        >
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        textAlign: "center",
                        zIndex: 10,
                        width: "100%",
                        pointerEvents: "none",
                    }}
                >
                    <h3 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                        プログラム
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
                        横にスクロールしてページをめくる
                    </p>
                </div>

                <motion.div
                    style={{
                        x,
                        display: "flex",
                        gap: `${CARD_GAP}px`,
                        paddingLeft: `max(10vw, calc(50vw - ${CARD_WIDTH / 2}px))`,
                        paddingRight: "50vw",
                    }}
                >
                    {PROGRAM_CHAPTERS.map((chapter, index) => (
                        <article
                            key={chapter.id}
                            className="glass-panel"
                            style={{
                                flexShrink: 0,
                                width: `${CARD_WIDTH}px`,
                                height: "450px",
                                padding: "3rem 2rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden",
                                borderColor: chapter.featured
                                    ? "rgba(var(--color-accent-rgb), 0.34)"
                                    : undefined,
                                background: chapter.featured
                                    ? "linear-gradient(180deg, rgba(var(--color-surface-rgb), 0.98) 0%, rgba(var(--color-accent-rgb), 0.12) 100%)"
                                    : undefined,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "10px",
                                    backgroundColor: chapter.featured
                                        ? "rgba(var(--color-accent-rgb), 0.9)"
                                        : "var(--color-accent)",
                                    opacity: 0.5,
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "1.5rem",
                                    color: "rgba(var(--color-accent-rgb), 0.34)",
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.2em",
                                }}
                            >
                                PAGE 0{index + 1}
                            </div>

                            <p
                                style={{
                                    color: chapter.featured ? "var(--color-accent-light)" : "var(--color-accent)",
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.15em",
                                    marginBottom: "2rem",
                                }}
                            >
                                {chapter.chapterLabel}
                            </p>

                            <h4
                                style={{
                                    color: chapter.featured ? "var(--color-accent-light)" : "var(--color-text)",
                                    fontSize: "1.5rem",
                                    fontFamily: "var(--font-heading)",
                                    lineHeight: 1.5,
                                    marginBottom: "2rem",
                                }}
                            >
                                {chapter.title}
                            </h4>

                            <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 2rem" }} />

                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                                {chapter.summary}
                            </p>
                        </article>
                    ))}
                </motion.div>

                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        opacity: 0.5,
                        pointerEvents: "none",
                    }}
                >
                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>SCROLL</span>
                    <div style={{ width: "40px", height: "1px", backgroundColor: "var(--color-text-muted)" }} />
                    <span style={{ fontSize: "1.2rem", transform: "rotate(-90deg)", color: "var(--color-text-muted)" }}>▼</span>
                </div>

                <p
                    style={{
                        position: "absolute",
                        bottom: "4.5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "var(--color-text-muted)",
                        fontSize: "0.82rem",
                        textAlign: "center",
                        pointerEvents: "none",
                    }}
                >
                    {PROGRAM_NOTE}
                </p>
            </div>
        </section>
    );
}
