"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Mock data
const messages = [
    { id: 1, name: "Maria", text: "初めてのトウシューズで緊張しますが、一生懸命がんばります！", role: "オーロラ姫", x: 15, y: 30, scale: 1 },
    { id: 2, name: "Yuki", text: "妖精の踊り、笑顔で踊りきります！", role: "リラの精", x: 70, y: 40, scale: 0.8 },
    { id: 3, name: "Sora", text: "みんなと息を合わせて綺麗な円を描きたいです。", role: "ワルツ", x: 45, y: 60, scale: 1.2 },
    { id: 4, name: "Aoi", text: "失敗を恐れずに、楽しんで踊ります！", role: "フロリナ王女", x: 80, y: 70, scale: 0.9 },
    { id: 5, name: "Hina", text: "練習の成果を全部出し切ります！", role: "宝石の精", x: 25, y: 75, scale: 1.1 },
];

export default function MessagesSection() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section className="section-padding" style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--color-primary-dark)", overflow: "hidden" }}>

            {/* Background Forest Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4 }}>
                <Image
                    src="/images/rose_full_bg.png"
                    alt="Forest and Roses"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: 'screen' }}
                />
            </div>

            <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "4rem" }}>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "1rem" }}
                >
                    森に灯る光
                </motion.h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
                    生徒たちの意気込みが光の粒となり、森を照らします。<br />
                    光をタップしてメッセージをご覧ください。
                </p>
            </div>

            {/* Lights Container */}
            <div style={{ position: "relative", width: "100%", height: "60vh", maxWidth: "1000px", margin: "0 auto" }}>
                {messages.map((msg) => {
                    const isActive = activeId === msg.id;
                    const duration = 4 + Math.random() * 6; // 4 to 10 seconds for more natural slow movement
                    const delay = Math.random() * 3;
                    const xMovement = (Math.random() - 0.5) * 40; // Reduced erratic movement
                    const yMovement = -30 - Math.random() * 40; // Slowly float upwards
                    const size = 60; // Base size for the particle

                    return (
                        <motion.div
                            key={msg.id}
                            style={{
                                position: "absolute",
                                left: `${msg.x}%`,
                                top: `${msg.y}%`,
                                cursor: "pointer",
                                zIndex: isActive ? 50 : 10,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: msg.scale }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.random() * 0.5, duration: 1 }}
                            onClick={() => setActiveId(isActive ? null : msg.id)}
                        >
                            {/* Particle Sparkle */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.6, 1, 0.6],
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{ position: 'relative', width: "60px", height: "60px", margin: "0 auto" }}
                                className="flex-center"
                            >
                                <Image
                                    src="/images/light_particle.png"
                                    alt="Light Particle"
                                    width={60}
                                    height={60}
                                    style={{
                                        objectFit: "contain",
                                        mixBlendMode: "screen",
                                        filter: "brightness(1.5) contrast(2) drop-shadow(0 0 15px rgba(255, 235, 150, 0.9))",
                                        maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                                        WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)"
                                    }}
                                />
                            </motion.div>

                            {/* Popup Message */}
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass-panel"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "250px",
                                        padding: "1.5rem",
                                        marginTop: "1rem",
                                        textAlign: "center",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                        border: "1px solid var(--color-accent)",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p style={{ fontSize: "1rem", color: "var(--color-text)", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                                        {msg.text}
                                    </p>
                                    <div style={{ fontSize: "0.9rem", color: "var(--color-accent)", marginTop: "1rem" }}>
                                        <span style={{ fontWeight: "bold" }}>{msg.name}</span>
                                        <span style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{msg.role}</span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex-center" style={{ marginTop: "2rem", zIndex: 10, position: "relative" }}>
                <button className="btn-primary">意気込みを投稿する（生徒専用）</button>
            </div>

            {/* Decorative Crown Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                transition={{ duration: 2 }}
                style={{ position: 'absolute', bottom: "-10%", right: "-5%", width: "40%", height: "40%", pointerEvents: 'none' }}
            >
                <Image
                    src="/images/crown.png"
                    alt="Crown Decoration"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom right", mixBlendMode: 'screen' }}
                />
            </motion.div>

        </section>
    );
}
