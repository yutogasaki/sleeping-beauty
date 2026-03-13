"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type GiftType = {
    id: string;
    name: string;
    price: string;
    description: string;
    color: string;
    icon: string;
};

type SuccessParticle = {
    id: number;
    scale: number;
    x: number;
    y: number;
    duration: number;
};

const gifts: GiftType[] = [
    { id: "ruby", name: "ルビーの祝福", price: "¥1,000", description: "あたたかな応援の気持ちを贈ります", color: "#E0115F", icon: "💎" },
    { id: "sapphire", name: "サファイアの祈り", price: "¥3,000", description: "舞台の成功を願う深い祈りを贈ります", color: "#0F52BA", icon: "💠" },
    { id: "rose", name: "魔法のバラ", price: "¥5,000", description: "最高級の賛辞と永遠の魔法を贈ります", color: "#FF007F", icon: "🌹" },
];

function createSuccessParticles() {
    return Array.from({ length: 20 }, (_, index): SuccessParticle => ({
        id: index,
        scale: Math.random() * 1 + 0.5,
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400 - 200,
        duration: 1.5 + Math.random() * 1,
    }));
}

export default function GiftSection() {
    const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successParticles, setSuccessParticles] = useState<SuccessParticle[]>([]);

    const handleSendGift = () => {
        setIsProcessing(true);
        // モック決済処理（2秒後に成功）
        setTimeout(() => {
            setIsProcessing(false);
            setSuccessParticles(createSuccessParticles());
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setSuccessParticles([]);
                setSelectedGift(null);
            }, 3500); // 成功画面を3.5秒表示
        }, 2000);
    };

    return (
        <section className="section-padding" style={{ backgroundColor: "var(--color-primary-dark)", position: "relative" }}>
            <div className="container" style={{ textAlign: "center", maxWidth: "900px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "0.5rem" }}>
                        王国への贈り物
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem", fontSize: "1.05rem" }}>
                        皆様のあたたかなご支援が、舞台をさらに美しく彩ります。<br />
                        お花に代わるデジタルギフトでダンサーたちへエールをお送りください。
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                        {gifts.map((gift, index) => (
                            <motion.div
                                key={gift.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="glass-panel"
                                style={{
                                    padding: "2rem",
                                    cursor: "pointer",
                                    border: selectedGift?.id === gift.id ? `2px solid ${gift.color}` : "1px solid rgba(255,255,255,0.05)",
                                    transform: selectedGift?.id === gift.id ? "translateY(-5px)" : "none",
                                    transition: "all 0.3s ease",
                                    boxShadow: selectedGift?.id === gift.id ? `0 10px 30px ${gift.color}40` : "none"
                                }}
                                onClick={() => setSelectedGift(gift)}
                            >
                                <div style={{ fontSize: "3rem", marginBottom: "1rem", filter: `drop-shadow(0 0 10px ${gift.color})` }}>
                                    {gift.icon}
                                </div>
                                <h4 style={{ fontSize: "1.3rem", color: gift.color, marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                                    {gift.name}
                                </h4>
                                <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "var(--color-text)", marginBottom: "1rem" }}>
                                    {gift.price}
                                </p>
                                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                    {gift.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedGift && !isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ marginTop: "3rem", overflow: "hidden" }}
                            >
                                <button
                                    className="btn-primary"
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        padding: "1rem",
                                        fontSize: "1.2rem",
                                        background: isProcessing ? "transparent" : `linear-gradient(135deg, ${selectedGift.color}80 0%, ${selectedGift.color}20 100%)`,
                                        borderColor: selectedGift.color,
                                        opacity: isProcessing ? 0.7 : 1
                                    }}
                                    onClick={handleSendGift}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? "魔法を送信中..." : `${selectedGift.name} を贈る`}
                                </button>
                                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
                                    ※これはモック機能です。実際の決済処理は行われません。
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Success Overlay Animation */}
            <AnimatePresence>
                {isSuccess && selectedGift && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(5, 10, 17, 0.9)",
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -20 }}
                            animate={{
                                scale: [0.5, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ fontSize: "6rem", filter: `drop-shadow(0 0 30px ${selectedGift.color})` }}
                        >
                            {selectedGift.icon}
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            style={{
                                color: "var(--color-text)",
                                fontSize: "2rem",
                                marginTop: "2rem",
                                textShadow: `0 0 15px ${selectedGift.color}`,
                                fontFamily: "var(--font-heading)"
                            }}
                        >
                            ありがとうございます！
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{ color: "var(--color-text-muted)", marginTop: "1rem", fontSize: "1.1rem" }}
                        >
                            あたたかな祝福が、ダンサーたちへ届けられました。
                        </motion.p>

                        {/* Particle Effects for success */}
                        {successParticles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    scale: particle.scale
                                }}
                                animate={{
                                    opacity: 0,
                                    x: particle.x,
                                    y: particle.y,
                                }}
                                transition={{
                                    duration: particle.duration,
                                    ease: "easeOut",
                                    delay: 0.2
                                }}
                                style={{
                                    position: "absolute",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: selectedGift.color,
                                    boxShadow: `0 0 10px ${selectedGift.color}`,
                                    pointerEvents: "none"
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
