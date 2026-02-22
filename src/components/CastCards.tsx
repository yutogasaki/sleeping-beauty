"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type CastType = {
    id: string;
    role: string;
    name: string;
    description: string;
    color: string;
    icon: string;
};

const castData: CastType[] = [
    {
        id: "aurora",
        role: "オーロラ姫",
        name: "YUKI",
        description: "16歳の誕生日に呪いを受け、100年の眠りにつく美しき王女。気品高く、すべての者に愛される光のような存在。",
        color: "#FFB7B2", // 柔らかいピンク系
        icon: "👑"
    },
    {
        id: "desire",
        role: "デジレ王子",
        name: "KEN",
        description: "100年後の世界でリラの精に導かれ、オーロラ姫の呪いを解く運命の王子。",
        color: "#A2C2E6", // ロイヤルブルー寄り
        icon: "🗡️"
    },
    {
        id: "lilac",
        role: "リラの精",
        name: "SARA",
        description: "善と知恵の象徴。カラボスの呪いを和らげ、オーロラと王国を絶望から救う希望の光。",
        color: "#C8A2C8", // ライラック色
        icon: "✨"
    },
    {
        id: "carabosse",
        role: "悪の精 カラボス",
        name: "RINA",
        description: "洗礼式に招かれなかったことに激怒し、姫に死の呪いをかけた強大で恐ろしい悪の妖精。",
        color: "#5C4033", // ダークブラウン/ブラック系
        icon: "🥀"
    }
];

export default function CastCards() {
    return (
        <section className="section-padding" style={{ backgroundColor: "var(--color-primary-dark)", position: "relative", zIndex: 10, overflow: "hidden" }}>
            {/* Decorative Background Elements */}
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-100px", right: "-50px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(11,25,44,0.5) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div className="container" style={{ textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "4rem" }}
                >
                    <h3 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                        物語を紡ぐ者たち
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>
                        CAST & CHARACTERS
                    </p>
                    <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                        カードをタップして裏面をご覧ください
                    </p>
                </motion.div>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "2rem",
                    perspective: "1000px" // 3D効果の基準点
                }}>
                    {castData.map((cast, index) => (
                        <FlipCard key={cast.id} cast={cast} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FlipCard({ cast, index }: { cast: CastType; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
            style={{
                width: "260px",
                height: "380px",
                cursor: "pointer",
                transformStyle: "preserve-3d", // 子要素の3D空間を維持
            }}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* --- 表面 (Front) --- */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden", // 裏返った時は見えない
                    background: `linear-gradient(145deg, rgba(30, 62, 98, 0.8) 0%, rgba(11, 25, 44, 0.9) 100%)`,
                    border: `1px solid ${cast.color}40`,
                    borderRadius: "16px",
                    boxShadow: `0 15px 35px rgba(0,0,0,0.5), inset 0 0 0 1px ${cast.color}20`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    overflow: "hidden"
                }}>
                    {/* タロット風の装飾枠 */}
                    <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", border: `1px solid ${cast.color}30`, borderRadius: "12px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "15px", bottom: "15px", left: "15px", right: "15px", border: `1px dashed ${cast.color}20`, borderRadius: "10px", pointerEvents: "none" }} />

                    <div style={{ fontSize: "4rem", marginBottom: "2rem", filter: `drop-shadow(0 0 15px ${cast.color}80)` }}>
                        {cast.icon}
                    </div>
                    <h4 style={{ color: "var(--color-text)", fontSize: "1.4rem", fontFamily: "var(--font-heading)", textShadow: `0 0 10px ${cast.color}50` }}>
                        {cast.role}
                    </h4>

                    <div style={{ marginTop: "auto", fontSize: "0.8rem", color: cast.color, letterSpacing: "0.2em", opacity: 0.7 }}>
                        TAP TO FLIP
                    </div>
                </div>

                {/* --- 裏面 (Back) --- */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)", // 初期状態で裏返しておく
                    background: `linear-gradient(135deg, ${cast.color}15 0%, rgba(11,25,44,0.95) 100%)`,
                    border: `1px solid ${cast.color}`,
                    borderRadius: "16px",
                    boxShadow: `0 0 30px ${cast.color}30`,
                    display: "flex",
                    flexDirection: "column",
                    padding: "2rem",
                    textAlign: "center"
                }}>
                    <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", border: `1px solid ${cast.color}40`, borderRadius: "12px", pointerEvents: "none" }} />

                    <p style={{ color: cast.color, fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                        {cast.role}
                    </p>
                    <h4 style={{ color: "var(--color-text)", fontSize: "1.8rem", fontFamily: "var(--font-heading)", marginBottom: "1.5rem", borderBottom: `1px solid ${cast.color}40`, paddingBottom: "0.5rem" }}>
                        {cast.name}
                    </h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.8, textAlign: "left" }}>
                        {cast.description}
                    </p>

                    <div style={{ marginTop: "auto" }}>
                        <div style={{ width: "30px", height: "2px", backgroundColor: cast.color, margin: "0 auto", opacity: 0.5 }} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
