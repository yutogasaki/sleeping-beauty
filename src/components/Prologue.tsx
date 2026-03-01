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
    // テキストが画面中央を十分に通り過ぎてから薄くなるよう、プラトー（=1の区間）を広く取る
    const opacity1 = useTransform(scrollYProgress, [0.25, 0.38, 0.65, 0.72], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.25, 0.38], [40, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.5, 0.6, 0.82, 0.88], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.5, 0.6], [40, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.72, 0.82, 0.97], [0, 1, 1]); // 最後のテキストは残す
    const y3 = useTransform(scrollYProgress, [0.72, 0.82], [40, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: "130vh", // ヒーローとの間隔を詰めつつスクロール体験を維持
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

            <div style={{ position: "sticky", top: "25%", width: "100%", maxWidth: "600px", textAlign: "center", zIndex: 2 }}>

                <motion.div style={{ opacity: opacity1, y: y1, position: "absolute", width: "100%", top: 0 }}>
                    <p style={{ color: "var(--color-text)", fontSize: "1.05rem", letterSpacing: "0.15em", lineHeight: 2.2, fontFamily: "var(--font-heading)", textShadow: "0 0 20px rgba(11,25,44,0.8)" }}>
                        ある王国に誕生した姫君オーロラ。<br />
                        祝福の宴に集いし妖精たちが<br />
                        美徳の贈り物を授けるさなか、<br />
                        闇の妖精カラボスが姿を現し、<br />
                        「紡錘に触れたとき、この姫は命を失う」と<br />
                        残酷な運命を告げます。
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity2, y: y2, position: "absolute", width: "100%", top: "250px" }}>
                    <p style={{ color: "var(--color-text)", fontSize: "1.05rem", letterSpacing: "0.15em", lineHeight: 2.2, fontFamily: "var(--font-heading)", textShadow: "0 0 20px rgba(11,25,44,0.8)" }}>
                        しかし、リラの精はその定めを書き換えました。<br />
                        死ではなく、百年の眠りへと。
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity3, y: y3, position: "absolute", width: "100%", top: "370px" }}>
                    <p style={{ color: "var(--color-accent)", fontSize: "1.3rem", letterSpacing: "0.1em", lineHeight: 2, fontFamily: "var(--font-heading)", textShadow: "0 0 10px rgba(212,175,55,0.5)" }}>
                        やがて目覚めのときは訪れる――<br />
                        真実の愛とともに。
                    </p>
                    <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, var(--color-accent), transparent)", margin: "2rem auto 0" }} />
                </motion.div>

            </div>
        </section>
    );
}
