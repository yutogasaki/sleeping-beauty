"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ProgramItem = {
    id: string;
    part: string;
    title: string;
    performers?: string;
};

const programData: ProgramItem[] = [
    {
        id: "p1",
        part: "第一部: クラシックバレエ小品集",
        title: "ドン・キホーテよりグラン・パ・ド・ドゥ",
        performers: "ゲスト、生徒一同"
    },
    {
        id: "p2",
        part: "第二部: オリジナル作品",
        title: "オリエンタル、ファンタジーミックス",
        performers: "ゲスト、生徒一同"
    },
    {
        id: "p3",
        part: "第三部: 眠りの森の美女",
        title: "第1幕: オーロラ姫の16歳の誕生日",
        performers: "オーロラ姫、求婚者たち、カラボス"
    },
    {
        id: "p4",
        part: "第三部: 眠りの森の美女",
        title: "第2幕: 100年後の森〜呪いの解放",
        performers: "デジレ王子、リラの精、オーロラ姫"
    },
    {
        id: "p5",
        part: "第三部: 眠りの森の美女",
        title: "第3幕: 華麗なる結婚式",
        performers: "全キャスト"
    }
];

export default function ProgramCarousel() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]); // データ数に応じて調整

    return (
        <section
            ref={targetRef}
            style={{
                height: "300vh", // スクロール領域を確保
                backgroundColor: "var(--color-primary)",
                borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            }}
        >
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

                {/* Section Title Container */}
                <div style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    zIndex: 10,
                    width: "100%",
                    pointerEvents: "none"
                }}>
                    <h3 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                        プログラム
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
                        横にスクロールしてページをめくる
                    </p>
                </div>

                <motion.div
                    style={{ x, display: "flex", gap: "2rem", paddingLeft: "max(10vw, calc(50vw - 150px))", paddingRight: "50vw" }}
                >
                    {programData.map((item, index) => (
                        <div
                            key={item.id}
                            className="glass-panel"
                            style={{
                                flexShrink: 0,
                                width: "300px",
                                height: "450px",
                                padding: "3rem 2rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* ブックマーク/ページ番号的要素 */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "10px", backgroundColor: "var(--color-accent)", opacity: 0.5 }} />
                            <div style={{ position: "absolute", top: "1.5rem", color: "rgba(212,175,55,0.3)", fontSize: "0.8rem", letterSpacing: "0.2em" }}>
                                PAGE 0{index + 1}
                            </div>

                            <p style={{ color: "var(--color-accent)", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "2rem" }}>
                                {item.part}
                            </p>

                            <h4 style={{ color: "var(--color-text)", fontSize: "1.4rem", fontFamily: "var(--font-heading)", lineHeight: 1.5, marginBottom: "2rem" }}>
                                {item.title}
                            </h4>

                            {item.performers && (
                                <>
                                    <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 2rem" }} />

                                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                        <span style={{ display: "block", fontSize: "0.7rem", marginBottom: "0.5rem", opacity: 0.7 }}>出演</span>
                                        {item.performers}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* スクロールガイド */}
                <div style={{
                    position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)",
                    display: "flex", alignItems: "center", gap: "10px", opacity: 0.5, pointerEvents: "none"
                }}>
                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>SCROLL</span>
                    <div style={{ width: "40px", height: "1px", backgroundColor: "var(--color-text-muted)" }} />
                    <span style={{ fontSize: "1.2rem", transform: "rotate(-90deg)", color: "var(--color-text-muted)" }}>▼</span>
                </div>
            </div>
        </section>
    );
}
