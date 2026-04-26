"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type CSSProperties, useState } from "react";

type CastType = {
    id: string;
    role: string;
    name: string;
    affiliation?: string;
    description: string;
    color: string;
    image: string;
    imageScale?: number;
    imageOffsetX?: string;
    imageOffsetY?: string;
    imageFilter?: string;
};

const castData: CastType[] = [
    {
        id: "aurora",
        role: "オーロラ姫",
        name: "成田 寧音",
        description: "16歳の誕生日に呪いを受け、100年の眠りにつく美しき王女。気品高く、すべての者に愛される光のような存在。",
        color: "#c97970",
        image: "/images/cast-aurora-sage.png",
        imageScale: 1.07,
        imageFilter: "brightness(0.94) contrast(1.26) saturate(1.2)"
    },
    {
        id: "desire",
        role: "デジレ王子",
        name: "長谷川元志",
        affiliation: "神澤千景バレエスタジオ",
        description: "100年後の世界でリラの精に導かれ、オーロラ姫の呪いを解く運命の王子。",
        color: "#7f9468",
        image: "/images/cast-desire-sage.png",
        imageScale: 1.07,
        imageFilter: "brightness(0.94) contrast(1.26) saturate(1.2)"
    },
    {
        id: "lilac",
        role: "リラの精",
        name: "甲斐 愛",
        description: "善と知恵の象徴。カラボスの呪いを和らげ、オーロラと王国を絶望から救う希望の光。",
        color: "#b58a50",
        image: "/images/cast-lilac-sage.png",
        imageScale: 1.06,
        imageFilter: "brightness(0.94) contrast(1.26) saturate(1.2)"
    },
    {
        id: "carabosse",
        role: "カラボス",
        name: "伊藤 あゆみ",
        description: "物語の運命を揺り動かす闇の妖精。祝宴に影を落とし、百年の眠りへの扉を開く。",
        color: "#8a5148",
        image: "/images/cast-carabosse-sage.png",
        imageScale: 1.04,
        imageFilter: "brightness(0.95) contrast(1.18) saturate(1.08)"
    },
    {
        id: "florina",
        role: "フロリナ王女",
        name: "藤原 彩愛",
        description: "青い鳥とともに祝宴へ軽やかな風を運ぶ王女。気品の中に、晴れやかな躍動がきらめく。",
        color: "#6f8ca7",
        image: "/images/cast-florina-sage.png",
        imageScale: 1.05,
        imageFilter: "brightness(0.94) contrast(1.26) saturate(1.2)"
    },
    {
        id: "bluebird",
        role: "青い鳥",
        name: "南野 高廣",
        affiliation: "松岡伶子バレエ団",
        description: "フロリナ王女に寄り添い、空へ誘うように舞う青い鳥。祝宴に伸びやかな輝きを添える。",
        color: "#6f8ca7",
        image: "/images/cast-bluebird-sage.png",
        imageScale: 1.04,
        imageFilter: "brightness(0.94) contrast(1.24) saturate(1.28)"
    }
];

export default function CastCards() {
    return (
        <section className="section-padding ornament-section storybook-grove-section" style={{ position: "relative", zIndex: 10, overflow: "hidden" }}>
            {/* Decorative Background Elements */}
            <div style={{ position: "absolute", top: "2rem", left: "50%", width: "min(42rem, 72vw)", height: "1px", transform: "translateX(-50%)", background: "linear-gradient(90deg, transparent, rgba(var(--color-gold-rgb), 0.5), transparent)", pointerEvents: "none" }} />

            <div className="container" style={{ textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "4rem" }}
                >
                    <h3 className="section-heading-rule" style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
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
                        <FlipCard
                            key={cast.id}
                            cast={cast}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FlipCard({
    cast,
    index,
}: {
    cast: CastType;
    index: number;
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const portraitStyle = {
        "--portrait-scale": cast.imageScale?.toString() ?? "0.96",
        "--portrait-x": cast.imageOffsetX ?? "0px",
        "--portrait-y": cast.imageOffsetY ?? "0px",
    } as CSSProperties;

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
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg) translateZ(0.1px)",
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    background: "linear-gradient(145deg, rgba(var(--color-paper-light-rgb), 0.96) 0%, rgba(var(--color-paper-rgb), 0.98) 100%)",
                    border: `1px solid ${cast.color}80`,
                    borderRadius: "14px",
                    boxShadow: `0 14px 28px rgba(var(--color-ink-rgb), 0.11), inset 0 0 0 1px rgba(255,255,255,0.65)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "1.35rem 1.5rem 1.5rem",
                    overflow: "hidden"
                }}>
                    {/* タロット風の装飾枠 */}
                    <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", border: `1px solid ${cast.color}40`, borderRadius: "10px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "15px", bottom: "15px", left: "15px", right: "15px", border: `1px dashed ${cast.color}2f`, borderRadius: "8px", pointerEvents: "none" }} />

                    <div
                        className="cast-portrait-medallion"
                        style={{
                            ...portraitStyle,
                            filter: `drop-shadow(0 14px 18px ${cast.color}34)`,
                            border: `1px solid ${cast.color}5f`,
                        }}
                    >
                        <Image
                            src={cast.image}
                            alt=""
                            fill
                            sizes="196px"
                            className="cast-portrait-image"
                            style={{
                                objectFit: "cover",
                                filter: cast.imageFilter,
                            }}
                        />
                    </div>
                    <h4 style={{ color: "var(--color-text)", fontSize: "1.4rem", lineHeight: 1.3, margin: 0, fontFamily: "var(--font-heading)", textShadow: "0 1px 0 rgba(255,255,255,0.65)" }}>
                        {cast.role}
                    </h4>

                    <div style={{ marginTop: "auto", fontSize: "0.8rem", color: cast.color, letterSpacing: "0.2em", opacity: 0.82 }}>
                        TAP TO FLIP
                    </div>
                </div>

                {/* --- 裏面 (Back) --- */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg) translateZ(0.1px)", // 初期状態で裏返しておく
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    backgroundColor: "var(--color-paper-light)",
                    backgroundImage: `linear-gradient(135deg, ${cast.color}18 0%, rgba(var(--color-paper-light-rgb), 0.98) 52%, rgba(var(--color-paper-rgb), 0.99) 100%)`,
                    border: `1px solid ${cast.color}`,
                    borderRadius: "14px",
                    boxShadow: `0 16px 30px rgba(var(--color-ink-rgb), 0.12)`,
                    display: "flex",
                    flexDirection: "column",
                    padding: "2rem",
                    textAlign: "center"
                }}>
                    <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", border: `1px solid ${cast.color}40`, borderRadius: "10px", pointerEvents: "none" }} />

                    <p style={{ color: cast.color, fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                        {cast.role}
                    </p>
                    <h4 style={{ color: "var(--color-text)", fontSize: "1.8rem", fontFamily: "var(--font-heading)", marginBottom: cast.affiliation ? "0.7rem" : "1.5rem", borderBottom: `1px solid ${cast.color}40`, paddingBottom: "0.5rem" }}>
                        {cast.name}
                    </h4>
                    {cast.affiliation && (
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                            {cast.affiliation}
                        </p>
                    )}
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
