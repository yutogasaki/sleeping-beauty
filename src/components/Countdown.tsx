"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-08-23T15:00:00+09:00").getTime(); // 本番開演予定時刻

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = TARGET_DATE - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="section-padding flex-center" style={{ backgroundColor: "var(--color-primary-dark)", position: "relative", zIndex: 10 }}>
            <div className="container" style={{ textAlign: "center" }}>
                <h3 style={{ color: "var(--color-accent)", fontSize: "1.5rem", marginBottom: "2rem" }}>
                    王国の目覚めまで
                </h3>

                <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
                    <TimeBox value={timeLeft.days} label="DAYS" />
                    <TimeBox value={timeLeft.hours} label="HOURS" />
                    <TimeBox value={timeLeft.minutes} label="MINUTES" />
                    <TimeBox value={timeLeft.seconds} label="SECONDS" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ marginTop: "4rem", color: "var(--color-text-muted)" }}
                >
                    <p style={{ fontSize: "1.2rem", letterSpacing: "0.1em" }}>残りレッスン数</p>
                    <p className="text-glow" style={{ fontSize: "4rem", color: "var(--color-accent)", fontWeight: "bold", fontFamily: "var(--font-heading)", lineHeight: 1 }}>
                        42 <span style={{ fontSize: "1.5rem", color: "var(--color-text)", fontWeight: "normal" }}>回</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function TimeBox({ value, label }: { value: number; label: string }) {
    return (
        <motion.div
            className="glass-panel"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{
                padding: "2rem",
                minWidth: "120px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <span className="text-glow" style={{ fontSize: "3.5rem", fontWeight: "bold", color: "var(--color-text)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>
                {value.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-accent-light)", marginTop: "0.5rem", letterSpacing: "0.2em" }}>
                {label}
            </span>
        </motion.div>
    );
}
