"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type MessageData = {
    id: string; // uuid
    sender_name: string;
    content: string;
    color_theme: string;
    x?: number;
    y?: number;
    scale?: number;
};

export default function MessagesSection() {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    // フォーム用ステート
    const [formData, setFormData] = useState({ name: "", role: "", message: "", color: "yellow" });

    // 初期データの取得
    useEffect(() => {
        const fetchMessages = async () => {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('is_approved', true) // セキュリティポリシー側でも制限されているが念のため
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching messages:", error);
            } else if (data) {
                // UI表示用にランダムな位置とサイズを付与
                const messagesWithPositions = data.map(msg => ({
                    ...msg,
                    x: 10 + Math.random() * 80, // 10% ~ 90%
                    y: 20 + Math.random() * 60, // 20% ~ 80%
                    scale: 0.7 + Math.random() * 0.6 // 0.7 ~ 1.3
                }));
                setMessages(messagesWithPositions);
            }
        };
        fetchMessages();
    }, []);

    const activeMessage = messages.find(m => m.id === activeId);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        if (!supabase) {
            alert("データベースに接続されていません。");
            setFormStatus('idle');
            return;
        }

        const senderNameCombined = formData.role ? `${formData.name}（${formData.role}）` : formData.name;

        const { error } = await supabase
            .from('messages')
            .insert([
                {
                    sender_name: senderNameCombined,
                    content: formData.message,
                    color_theme: formData.color
                }
            ]);

        if (error) {
            console.error("Error inserting message:", error);
            alert("エラーが発生しました。もう一度お試しください。");
            setFormStatus('idle');
            return;
        }

        setFormStatus('success');
        setTimeout(() => {
            setIsFormOpen(false);
            setFormStatus('idle');
            setFormData({ name: "", role: "", message: "", color: "yellow" });
        }, 3000);
    };

    return (
        <section className="section-padding" style={{ position: "relative", minHeight: "100dvh", backgroundColor: "var(--color-primary-dark)", overflow: "hidden" }}>

            {/* Background Forest Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4 }}>
                <Image
                    src="/images/rose_full_bg.png"
                    alt="Forest and Roses"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: 'screen' }}
                />
            </div>

            <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "4rem" }}>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ color: "var(--color-accent)", fontSize: "2rem", marginBottom: "1rem" }}
                >
                    森に灯る光
                </motion.h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
                    生徒たちの意気込みが光の粒となり、森を照らします。<br />
                    光をタップしてメッセージをご覧ください。
                </p>
            </div>

            {/* Lights Container */}
            <div style={{ position: "relative", width: "100%", height: "60vh", maxWidth: "1000px", margin: "0 auto" }}>
                {messages.map((msg) => {
                    const isActive = activeId === msg.id;
                    const duration = 4 + Math.random() * 6; // 4 to 10 seconds for more natural slow movement
                    const delay = Math.random() * 3;
                    const xMovement = (Math.random() - 0.5) * 40; // Reduced erratic movement
                    const yMovement = -30 - Math.random() * 40; // Slowly float upwards
                    const size = 60; // Base size for the particle

                    return (
                        <motion.div
                            key={msg.id}
                            style={{
                                position: "absolute",
                                left: `${msg.x}%`,
                                top: `${msg.y}%`,
                                cursor: "pointer",
                                zIndex: isActive ? 50 : 10,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: msg.scale }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.random() * 0.5, duration: 1 }}
                            onClick={() => setActiveId(isActive ? null : msg.id)}
                        >
                            {/* Particle Sparkle */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.6, 1, 0.6],
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{ position: 'relative', width: "60px", height: "60px", margin: "0 auto" }}
                                className="flex-center"
                            >
                                <div style={{
                                    position: 'relative', width: "60px", height: "60px", margin: "0 auto",
                                    // color_theme に応じて色味を変えるフィルター処理
                                    filter: msg.color_theme === 'pink' ? 'hue-rotate(300deg)' :
                                        msg.color_theme === 'blue' ? 'hue-rotate(180deg)' :
                                            msg.color_theme === 'pure' ? 'grayscale(100%) brightness(2)' : 'none'
                                }}>
                                    <Image
                                        src="/images/light_particle.png"
                                        alt="Light Particle"
                                        width={60}
                                        height={60}
                                        style={{
                                            objectFit: "contain",
                                            mixBlendMode: "screen",
                                            filter: "brightness(1.5) contrast(2) drop-shadow(0 0 15px rgba(255, 235, 150, 0.9))",
                                            maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                                            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)"
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Popup Message was moved out to a modal */}
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex-center" style={{ marginTop: "2rem", zIndex: 10, position: "relative" }}>
                <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
                    意気込みを投稿する（生徒専用）
                </button>
            </div>

            {/* Decorative Crown Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                transition={{ duration: 2 }}
                style={{ position: 'absolute', bottom: "-10%", right: "-5%", width: "40%", height: "40%", pointerEvents: 'none' }}
            >
                <Image
                    src="/images/crown.png"
                    alt="Crown Decoration"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom right", mixBlendMode: 'screen' }}
                />
            </motion.div>

            {/* Modal Overlay for Showing Message */}
            <AnimatePresence>
                {activeMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(5, 10, 17, 0.85)",
                            backdropFilter: "blur(4px)",
                            zIndex: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem"
                        }}
                        onClick={() => setActiveId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-panel"
                            style={{
                                width: "100%",
                                maxWidth: "400px",
                                padding: "3rem 2rem",
                                textAlign: "center",
                                position: "relative",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                border: "1px solid rgba(212, 175, 55, 0.3)"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveId(null)}
                                style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "var(--color-text-muted)", fontSize: "1.8rem", cursor: "pointer", padding: "5px" }}
                            >
                                ×
                            </button>
                            <p style={{ fontSize: "1.2rem", color: "var(--color-text)", marginBottom: "2rem", fontFamily: "var(--font-heading)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                                "{activeMessage.content}"
                            </p>
                            <div style={{ color: "var(--color-accent)" }}>
                                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{activeMessage.sender_name}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Overlay for Submission Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(5, 10, 17, 0.85)",
                            backdropFilter: "blur(5px)",
                            zIndex: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem"
                        }}
                        onClick={() => setIsFormOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-panel"
                            style={{
                                width: "100%",
                                maxWidth: "500px",
                                padding: "2.5rem 2rem",
                                position: "relative",
                                textAlign: "left",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                border: "1px solid rgba(212, 175, 55, 0.3)"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsFormOpen(false)}
                                style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "var(--color-text-muted)", fontSize: "1.8rem", cursor: "pointer", padding: "5px" }}
                            >
                                ×
                            </button>

                            {formStatus === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex-center"
                                    style={{ flexDirection: 'column', height: '250px', textAlign: 'center' }}
                                >
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.8))' }}>✨</div>
                                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.8rem', fontSize: '1.4rem' }}>意気込みが森に宿りました</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>運営の確認後、<br />光の粒となって現れます。</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <h4 style={{ color: "var(--color-accent)", marginBottom: "1.5rem", textAlign: "center", fontSize: "1.4rem" }}>意気込みを投稿する</h4>

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>お名前（ニックネーム可）</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }} />
                                    </div>

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>演目・配役など（任意）</label>
                                        <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="例：ワルツ、妖精など" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }} />
                                    </div>

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>光の粒の色</label>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            {['yellow', 'pink', 'blue', 'pure'].map(c => (
                                                <label key={c} style={{ display: "flex", alignItems: "center", gap: "0.3rem", cursor: "pointer", color: "white", fontSize: "0.9rem" }}>
                                                    <input type="radio" name="color" value={c} checked={formData.color === c} onChange={() => setFormData({ ...formData, color: c })} />
                                                    {c === 'yellow' ? '黄金' : c === 'pink' ? '桜色' : c === 'blue' ? '蒼穹' : '純白'}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: "2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>意気込みメッセージ</label>
                                        <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", resize: "none", outline: "none" }}></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ width: "100%", opacity: formStatus === 'submitting' ? 0.7 : 1 }}
                                        disabled={formStatus === 'submitting'}
                                    >
                                        {formStatus === 'submitting' ? '送信中...' : '光の粒を送る'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
