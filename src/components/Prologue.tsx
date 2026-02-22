"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Prologue() {
    const containerRef = useRef<HTMLDivElement>(null);

    // スクロール量を取得
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // スクロール位置に応じてテキストの不透明度とY位置を変化させる
    const opacity1 = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0.3]);
    const y1 = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0.3]);
    const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 1]); // 最後のテキストは残す
    const y3 = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: "150vh", // 長めに取ってスクロール体験を作る
                backgroundColor: "var(--color-primary-dark)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2rem",
                overflow: "hidden"
            }}
        >
            {/* 背景の装飾テクスチャ：茨のような抽象的な線 */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: "radial-gradient(ellipse at center, rgba(11,25,44,0) 0%, rgba(5,10,17,1) 100%)",
                pointerEvents: "none",
                zIndex: 1
            }} />

            <div style={{ position: "sticky", top: "30%", width: "100%", maxWidth: "600px", textAlign: "center", zIndex: 2 }}>

                <motion.div style={{ opacity: opacity1, y: y1, position: "absolute", width: "100%", top: 0 }}>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", letterSpacing: "0.15em", lineHeight: 2, fontFamily: "var(--font-heading)" }}>
                        むかしむかし、ある王国に<br />
                        美しい姫が生まれました。
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity2, y: y2, position: "absolute", width: "100%", top: "80px" }}>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", letterSpacing: "0.15em", lineHeight: 2, fontFamily: "var(--font-heading)" }}>
                        しかし、招かれざる悪の精により<br />
                        恐ろしい呪いがかけられてしまいます。
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity3, y: y3, position: "absolute", width: "100%", top: "160px" }}>
                    <p style={{ color: "var(--color-accent)", fontSize: "1.3rem", letterSpacing: "0.1em", lineHeight: 2, fontFamily: "var(--font-heading)", textShadow: "0 0 10px rgba(212,175,55,0.5)" }}>
                        百年の時を超え、<br />
                        真実の愛が目を覚ます。
                    </p>
                    <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, var(--color-accent), transparent)", margin: "2rem auto 0" }} />
                </motion.div>

            </div>
        </section>
    );
}
