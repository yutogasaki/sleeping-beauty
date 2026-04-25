"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Prologue() {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // スクロール量を取得
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const { scrollYProgress: entryProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    // スクロール位置に応じてテキストの不透明度とY位置を変化させる
    // テキストが画面中央を十分に通り過ぎてから薄くなるよう、プラトー（=1の区間）を広く取る
    const opacity1 = useTransform(scrollYProgress, [0, 0.5, 0.62], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.12], [0, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.22, 0.36, 0.7, 0.78], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.22, 0.36], [40, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.48, 0.64, 0.97], [0, 1, 1]); // 最後のテキストは残す
    const y3 = useTransform(scrollYProgress, [0.48, 0.64], [40, 0]);

    const curtainOpacity = useTransform(entryProgress, [0, 0.08, 0.68, 0.98], [0, 0.92, 0.58, 0]);
    const leftCurtainX = useTransform(entryProgress, [0, 0.2, 0.88], ["0%", "0%", "-104%"]);
    const rightCurtainX = useTransform(entryProgress, [0, 0.2, 0.88], ["0%", "0%", "104%"]);
    const spotlightOpacity = useTransform(entryProgress, [0, 0.18, 0.72, 1], [0, 0.64, 0.42, 0]);
    const spotlightScale = useTransform(entryProgress, [0, 0.88], [0.72, 1.18]);

    return (
        <section
            ref={containerRef}
            className="prologue-section"
        >
            <div className="prologue-scrim" />

            {!shouldReduceMotion && (
                <motion.div
                    className="prologue-curtain-reveal"
                    aria-hidden="true"
                    style={{ opacity: curtainOpacity }}
                >
                    <motion.div
                        className="prologue-spotlight-mask"
                        style={{
                            opacity: spotlightOpacity,
                            scaleX: spotlightScale,
                            scaleY: spotlightScale,
                        }}
                    />
                    <motion.div
                        className="prologue-curtain-panel prologue-curtain-panel-left"
                        style={{ x: leftCurtainX }}
                    />
                    <motion.div
                        className="prologue-curtain-panel prologue-curtain-panel-right"
                        style={{ x: rightCurtainX }}
                    />
                    <div className="prologue-footlight-shadow" />
                </motion.div>
            )}

            <div className="prologue-inner">

                <motion.div style={{ opacity: opacity1, y: y1, position: "absolute", width: "100%", top: 0 }}>
                    <p style={{ color: "var(--color-text)", fontSize: "1.05rem", letterSpacing: "0.15em", lineHeight: 2.2, fontFamily: "var(--font-heading)", textShadow: "0 1px 0 rgba(255, 255, 255, 0.72)" }}>
                        ある王国に誕生した姫君オーロラ。<br />
                        祝福の宴に集いし妖精たちが<br />
                        美徳の贈り物を授けるさなか、<br />
                        闇の妖精カラボスが姿を現し、<br />
                        「紡錘に触れたとき、この姫は命を失う」と<br />
                        残酷な運命を告げます。
                    </p>
                </motion.div>

                <motion.div className="prologue-block-secondary" style={{ opacity: opacity2, y: y2, position: "absolute", width: "100%" }}>
                    <p style={{ color: "var(--color-text)", fontSize: "1.05rem", letterSpacing: "0.15em", lineHeight: 2.2, fontFamily: "var(--font-heading)", textShadow: "0 1px 0 rgba(255, 255, 255, 0.72)" }}>
                        しかし、リラの精はその定めを書き換えました。<br />
                        死ではなく、百年の眠りへと。
                    </p>
                </motion.div>

                <motion.div className="prologue-block-final" style={{ opacity: opacity3, y: y3, position: "absolute", width: "100%" }}>
                    <p style={{ color: "var(--color-accent)", fontSize: "1.3rem", letterSpacing: "0.1em", lineHeight: 2, fontFamily: "var(--font-heading)", textShadow: "0 1px 0 rgba(255, 255, 255, 0.72)" }}>
                        やがて目覚めのときは訪れる――<br />
                        真実の愛とともに。
                    </p>
                    <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, var(--color-accent), transparent)", margin: "2rem auto 0" }} />
                </motion.div>

            </div>
        </section>
    );
}
