"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function MainHero() {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Parallax Layers (y-axis movement based on scroll)
    // 1. Background (Slowest - moves down slightly)
    const yBg = useTransform(scrollY, [0, 800], [0, 200]);

    // 2. Middle (Normal - title floats)
    const yMid = useTransform(scrollY, [0, 800], [0, 0]);

    // 3. Foreground (Fastest - silhouettes move up quickly past the view)
    const yFgAurora = useTransform(scrollY, [0, 800], [0, -300]);
    const yFgCorps = useTransform(scrollY, [0, 800], [0, -200]);

    return (
        <section className="hero-section" style={{ position: "relative", height: "100dvh", overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* --- LAYER 1: Background (遠景) --- */}
            <motion.div style={{ y: yBg, position: 'absolute', top: 0, left: 0, right: 0, bottom: "-20%", zIndex: 1 }}>
                <Image
                    src="/images/main_visual.png"
                    alt="Sleeping Beauty Castle and Forest"
                    fill
                    priority
                    style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.4)" }}
                />
                {/* Deep Forest Gradient Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,10,17,0.2) 0%, rgba(5,10,17,0.8) 100%)" }} />
            </motion.div>

            {/* --- LAYER 2: Middle (中景) --- */}
            <motion.div
                style={{ y: yMid, textAlign: "center", zIndex: 10, padding: "0 20px", width: "100%", maxWidth: "800px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div style={{ position: 'relative' }}>
                    {/* Gold Texture overlay for text area */}
                    <div style={{ position: 'absolute', top: "-50%", left: "-20%", right: "-20%", bottom: "-50%", zIndex: -1, opacity: 0.15, pointerEvents: 'none', maskImage: "radial-gradient(circle, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}>
                        <Image
                            src="/images/bg_texture.png"
                            alt="Texture"
                            fill
                            style={{ objectFit: "cover", mixBlendMode: 'screen' }}
                        />
                    </div>

                    <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", color: "var(--color-accent)", marginBottom: "1rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        AYAMI BALLET STUDIO<br />
                        第4回 発表会
                    </h2>
                    <h1
                        className="font-shippori mb-6 tracking-widest text-[#FDFDFD]"
                        style={{
                            fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                            textShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
                            whiteSpace: "nowrap"
                        }}
                    >
                        眠れる森の美女
                    </h1>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 3rem auto", lineHeight: 2, letterSpacing: "0.1em" }}>
                        百年の眠りから目覚める、<br />
                        特別な一日。
                    </p>

                    <button className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.2rem" }}>
                        王国の扉を開く
                    </button>
                </div>
            </motion.div>

            {/* --- LAYER 3: Foreground (近景 - シルエット) --- */}

            {/* Corps de ballet (群舞) - 奥側の近景 */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{
                    y: yFgCorps,
                    position: 'absolute',
                    bottom: isMobile ? "-10%" : "-15%",
                    left: "-10%",
                    width: isMobile ? "90%" : "55%",
                    height: "80%",
                    zIndex: 5,
                    pointerEvents: 'none',
                    mixBlendMode: "screen",
                    maskImage: "radial-gradient(ellipse at 50% 60%, black 10%, transparent 60%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 50% 60%, black 10%, transparent 60%)",
                    filter: "brightness(0.7) contrast(2) blur(1px)",
                    opacity: 0.8,
                    willChange: "transform"
                }}
            >
                <Image
                    src="/images/corps_de_ballet_silhouette.png"
                    alt="Corps de ballet"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom left" }}
                />
            </motion.div>

            {/* Aurora (オーロラ姫) - 一番手前の近景 */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 1 }}
                style={{
                    y: yFgAurora,
                    position: 'absolute',
                    bottom: isMobile ? "-10%" : "-15%",
                    right: isMobile ? "-15%" : "0%",
                    width: isMobile ? "70%" : "40%",
                    height: isMobile ? "60%" : "85%",
                    zIndex: 15,
                    pointerEvents: 'none',
                    mixBlendMode: "screen",
                    maskImage: "radial-gradient(ellipse at 50% 80%, black 40%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 50% 80%, black 40%, transparent 75%)",
                    filter: "brightness(1.5) contrast(2) drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))",
                    willChange: "transform"
                }}
            >
                <Image
                    src="/images/aurora_silhouette.png"
                    alt="Aurora"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom right" }}
                />
            </motion.div>

            {/* Bottom fade out to transition to next section */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "15vh", background: "linear-gradient(to top, var(--color-primary-dark) 0%, transparent 100%)", zIndex: 20, pointerEvents: "none" }} />

        </section>
    );
}
