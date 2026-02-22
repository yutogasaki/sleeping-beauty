"use client";

import { motion } from "framer-motion";

type TimelineItemType = {
    id: string;
    date: string;
    title: string;
    description: string;
    imageColor: string;
    status: "completed" | "active" | "upcoming";
};

const timelineData: TimelineItemType[] = [
    {
        id: "1",
        date: "2026.04.15",
        title: "第一回 通しリハーサル完了",
        description: "全体の流れと立ち位置の確認を行いました。課題も見え、これからの練習メニューが固まりました。",
        imageColor: "#1a365d",
        status: "completed"
    },
    {
        id: "2",
        date: "2026.06.01",
        title: "メインキャスト衣装到着",
        description: "オーロラ姫とリラの精の衣装がアトリエから届きました。細部まで美しい刺繍が施されています。",
        imageColor: "#2d3748",
        status: "completed"
    },
    {
        id: "3",
        date: "2026.07.20",
        title: "照明合わせ・ゲネプロ",
        description: "本番同様の照明演出を加えた通し稽古を行います。（関係者・保護者の皆様は後方席で見学可能です）",
        imageColor: "transparent",
        status: "active"
    }
];

export default function BehindTheScenes() {
    return (
        <section className="section-padding" style={{ backgroundColor: "var(--color-primary)", position: "relative", zIndex: 10, borderTop: "1px solid rgba(212,175,55,0.1)" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "4rem" }}
                >
                    <h3 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
                        舞台裏の記録
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>
                        BEHIND THE SCENES
                    </p>
                </motion.div>

                <div style={{ position: "relative" }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: "absolute",
                        top: 0, left: "20px", bottom: 0,
                        width: "2px",
                        background: "linear-gradient(to bottom, var(--color-accent) 0%, rgba(212,175,55,0.1) 100%)",
                        zIndex: 0
                    }} />

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{
                                position: "relative",
                                paddingLeft: "60px",
                                marginBottom: index === timelineData.length - 1 ? 0 : "4rem",
                                zIndex: 1
                            }}
                        >
                            {/* Dot */}
                            <div style={{
                                position: "absolute",
                                left: "14px",
                                top: "5px",
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%",
                                backgroundColor: item.status === "completed" ? "var(--color-accent)" :
                                    item.status === "active" ? "var(--color-text)" : "var(--color-primary-light)",
                                boxShadow: item.status === "active" ? "0 0 10px 2px rgba(255,255,255,0.5)" : "none",
                                border: "2px solid var(--color-primary)"
                            }} />

                            {/* Content Panel */}
                            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: item.status === "active" ? "3px solid var(--color-text)" : "1px solid rgba(255,255,255,0.05)" }}>
                                <span style={{
                                    display: "inline-block",
                                    padding: "0.2rem 0.8rem",
                                    borderRadius: "20px",
                                    backgroundColor: "rgba(212,175,55,0.1)",
                                    color: "var(--color-accent)",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    marginBottom: "1rem"
                                }}>
                                    {item.date}
                                </span>

                                <h4 style={{ fontSize: "1.3rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>
                                    {item.title}
                                </h4>
                                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                                    {item.description}
                                </p>

                                {/* Optional Mock Image Placeholder */}
                                {item.imageColor !== "transparent" && (
                                    <div style={{
                                        width: "100%",
                                        height: "150px",
                                        borderRadius: "8px",
                                        backgroundColor: item.imageColor,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        overflow: "hidden",
                                        position: "relative"
                                    }}>
                                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>[ Image Placeholder ]</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
