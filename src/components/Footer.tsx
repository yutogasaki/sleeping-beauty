"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: "var(--color-primary)",
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* メインコンテンツ */}
            <div style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "4rem 2rem 2rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "3rem",
            }}>
                {/* 公演情報 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h4 style={{
                        color: "var(--color-accent)",
                        fontSize: "1.1rem",
                        marginBottom: "1.2rem",
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "0.05em",
                    }}>
                        公演情報
                    </h4>
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 2 }}>
                        <p style={{ color: "var(--color-text)", fontWeight: "bold" }}>AYAMI BALLET STUDIO 第4回発表会</p>
                        <p>「眠れる森の美女」</p>
                        <p>2026年8月23日（日）15:00 開演</p>
                        <p>豊橋市芸術劇場PLAT 主ホール</p>
                    </div>
                </motion.div>

                {/* リンク */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h4 style={{
                        color: "var(--color-accent)",
                        fontSize: "1.1rem",
                        marginBottom: "1.2rem",
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "0.05em",
                    }}>
                        リンク
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        <a
                            href="https://toyohashi-at.jp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
                        >
                            → 豊橋市芸術劇場PLAT
                        </a>
                        <a
                            href="#"
                            style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
                        >
                            → AYAMI BALLET STUDIO 公式サイト
                        </a>
                        <a
                            href="#"
                            style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
                        >
                            → Instagram
                        </a>
                    </div>
                </motion.div>

                {/* お問い合わせ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h4 style={{
                        color: "var(--color-accent)",
                        fontSize: "1.1rem",
                        marginBottom: "1.2rem",
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "0.05em",
                    }}>
                        お問い合わせ
                    </h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                        公演に関するお問い合わせは<br />
                        スタジオまでご連絡ください。
                    </p>
                </motion.div>
            </div>

            {/* コピーライト */}
            <div style={{
                borderTop: "1px solid rgba(212, 175, 55, 0.1)",
                padding: "1.5rem 2rem",
                textAlign: "center",
            }}>
                <p style={{
                    color: "var(--color-accent-light)",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "0.05em",
                }}>
                    眠れる森の美女
                </p>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
                    © 2026 AYAMI BALLET STUDIO. All Rights Reserved.
                </p>
                <a
                    href="?preview=true"
                    style={{
                        color: "rgba(255,255,255,0.15)",
                        fontSize: "0.7rem",
                        textDecoration: "none",
                        marginTop: "0.5rem",
                        display: "inline-block",
                    }}
                >
                    Preview
                </a>
            </div>
        </footer>
    );
}
