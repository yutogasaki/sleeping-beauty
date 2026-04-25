"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type FlowerProduct = {
    id: string;
    name: string;
    price: string;
    description: string;
    color: string;
    image: string;
};

const flowerProducts: FlowerProduct[] = [
    {
        id: "bouquet",
        name: "花束",
        price: "価格未定",
        description: "出演者へお祝いの気持ちを届ける、手渡ししやすい花束です。",
        color: "#c97970",
        image: "/images/rose.png",
    },
    {
        id: "arrangement",
        name: "アレンジメント花",
        price: "価格未定",
        description: "受付や楽屋まわりを華やかに彩る、置き型のお祝い花です。",
        color: "#b58a50",
        image: "/images/crown.png",
    },
    {
        id: "stand",
        name: "スタンド花",
        price: "価格未定",
        description: "会場の雰囲気を大きく彩る、舞台祝い向けのお花です。",
        color: "#7f9468",
        image: "/images/rose_full_bg.png",
    },
];

export default function GiftSection() {
    return (
        <section className="section-padding ornament-section" style={{ position: "relative", zIndex: 10 }}>
            <div className="container" style={{ textAlign: "center", maxWidth: "900px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="section-heading-rule" style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
                        出演者へのお花
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", fontSize: "1.05rem" }}>
                        出演者へのお祝い花を受付予定です。<br />
                        販売ページ・申込方法は準備が整い次第こちらでご案内します。
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
                        {flowerProducts.map((flower, index) => (
                            <motion.div
                                key={flower.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="glass-panel"
                                style={{
                                    padding: "2rem",
                                    border: `1px solid ${flower.color}66`,
                                    boxShadow: "0 12px 24px rgba(var(--color-ink-rgb), 0.08)",
                                }}
                            >
                                <div style={{ width: "72px", height: "72px", margin: "0 auto 1rem", filter: `drop-shadow(0 8px 12px ${flower.color}38)`, position: "relative", overflow: "hidden", borderRadius: "50%", border: `1px solid ${flower.color}66`, background: "var(--color-forest)" }}>
                                    <Image src={flower.image} alt="" fill sizes="72px" style={{ objectFit: "cover", opacity: 0.78 }} />
                                </div>
                                <h4 style={{ fontSize: "1.3rem", color: flower.color, marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                                    {flower.name}
                                </h4>
                                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--color-text)", marginBottom: "1rem" }}>
                                    {flower.price}
                                </p>
                                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                                    {flower.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div
                        className="glass-panel"
                        style={{
                            margin: "3rem auto 0",
                            maxWidth: "520px",
                            padding: "1.5rem",
                            border: "1px solid var(--color-line-strong)",
                        }}
                    >
                        <h4 style={{ color: "var(--color-sage)", fontSize: "1.05rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                            お花販売は準備中です
                        </h4>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.8 }}>
                            受付開始後、出演者名を選んでお申し込みいただける販売サイトへのリンクを掲載します。
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
