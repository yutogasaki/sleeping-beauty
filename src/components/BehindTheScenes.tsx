"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TimelineItemType = {
    id: string;
    date: string;
    title: string;
    description: string;
    image: string | null;
    status: "completed" | "active" | "upcoming";
};

const timelineData: TimelineItemType[] = [
    {
        id: "1",
        date: "2026.04.01",
        title: "配役決定",
        description: "本番に向けて配役が決定しました。これから作品づくりと稽古の記録を少しずつお届けしていきます。",
        image: "/images/corps_de_ballet_silhouette.png",
        status: "completed"
    }
];

export default function BehindTheScenes() {
    return (
        <section className="section-padding ornament-section" style={{ position: "relative", zIndex: 10, borderTop: "1px solid var(--color-line)" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "4rem" }}
                >
                    <h3 className="section-heading-rule" style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
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
                        background: "linear-gradient(to bottom, var(--color-accent) 0%, rgba(var(--color-accent-rgb), 0.12) 100%)",
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
                                boxShadow: item.status === "active" ? "0 0 0 5px rgba(var(--color-rose-rgb), 0.12)" : "none",
                                border: "2px solid var(--color-paper-light)"
                            }} />

                            {/* Content Panel */}
                            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: item.status === "active" ? "3px solid var(--color-sage)" : "1px solid var(--color-line)" }}>
                                <span style={{
                                    display: "inline-block",
                                    padding: "0.2rem 0.8rem",
                                    borderRadius: "20px",
                                    backgroundColor: "rgba(var(--color-accent-rgb), 0.14)",
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

                                {item.image && (
                                    <div style={{
                                        width: "100%",
                                        height: "150px",
                                        borderRadius: "8px",
                                        backgroundColor: "rgba(var(--color-paper-aged-rgb), 0.35)",
                                        border: "1px solid var(--color-line)",
                                        overflow: "hidden",
                                        position: "relative"
                                    }}>
                                        <Image
                                            src={item.image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 800px) 100vw, 740px"
                                            style={{ objectFit: "contain", opacity: 0.45 }}
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.8, marginTop: "2rem", paddingLeft: "60px" }}>
                    そのほかの舞台裏の記録は、準備が整い次第掲載します。
                </p>
            </div>
        </section>
    );
}
