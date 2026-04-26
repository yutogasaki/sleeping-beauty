"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { usePreview } from "../lib/PreviewContext";
import { SAMPLE_MESSAGES } from "../lib/sampleData";

type MessageData = {
    id: string; // uuid
    sender_name: string;
    content: string;
    color_theme: string;
    x?: number;
    y?: number;
    scale?: number;
};

type DisplayMessage = MessageData & {
    x: number;
    y: number;
    scale: number;
    revealDelay: number;
    floatDuration: number;
    floatOffset: number;
    rotateAmplitude: number;
};

const MAX_VISIBLE_MESSAGE_PARTICLES = 18;
const MESSAGE_PARTICLE_PLACEMENTS = [
    { x: 16, y: 26, scale: 0.92 },
    { x: 74, y: 33, scale: 0.75 },
    { x: 45, y: 55, scale: 1.05 },
    { x: 84, y: 66, scale: 0.86 },
    { x: 25, y: 76, scale: 0.98 },
    { x: 59, y: 20, scale: 0.72 },
    { x: 34, y: 34, scale: 0.62 },
    { x: 66, y: 50, scale: 0.78 },
    { x: 12, y: 51, scale: 0.68 },
    { x: 51, y: 70, scale: 0.88 },
    { x: 78, y: 78, scale: 0.64 },
    { x: 29, y: 61, scale: 0.58 },
    { x: 88, y: 45, scale: 0.72 },
    { x: 41, y: 18, scale: 0.66 },
    { x: 56, y: 39, scale: 0.58 },
    { x: 18, y: 85, scale: 0.58 },
    { x: 68, y: 86, scale: 0.7 },
    { x: 36, y: 88, scale: 0.54 },
] as const;

function createDisplayMessage(message: MessageData): DisplayMessage {
    return {
        ...message,
        x: message.x ?? 10 + Math.random() * 80,
        y: message.y ?? 20 + Math.random() * 60,
        scale: message.scale ?? 0.7 + Math.random() * 0.6,
        revealDelay: Math.random() * 0.5,
        floatDuration: 3 + Math.random() * 2,
        floatOffset: -10 - Math.random() * 12,
        rotateAmplitude: 2 + Math.random() * 4,
    };
}

function toDisplayMessages(messages: MessageData[]) {
    return messages.map(createDisplayMessage);
}

function upsertDisplayMessage(messages: DisplayMessage[], message: MessageData) {
    const existingMessage = messages.find(m => m.id === message.id);

    if (existingMessage) {
        return messages.map(m => m.id === message.id ? { ...m, ...message } : m);
    }

    return [createDisplayMessage(message), ...messages];
}

function placeVisibleMessage(message: DisplayMessage, index: number): DisplayMessage {
    const placement = MESSAGE_PARTICLE_PLACEMENTS[index % MESSAGE_PARTICLE_PLACEMENTS.length];

    return {
        ...message,
        x: placement.x,
        y: placement.y,
        scale: placement.scale,
    };
}

export default function MessagesSection() {
    const isPreview = usePreview();
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    // 初期データの取得（プレビューモード・DB未接続・空の場合はサンプルデータを表示）
    useEffect(() => {
        let isActive = true;

        const fetchMessages = async () => {
            if (isPreview) {
                if (isActive) {
                    setMessages(toDisplayMessages(SAMPLE_MESSAGES));
                }
                return;
            }
            if (!supabase) {
                if (isActive) {
                    setMessages(toDisplayMessages(SAMPLE_MESSAGES));
                }
                return;
            }
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('is_approved', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching messages:", error);
                if (isActive) {
                    setMessages(toDisplayMessages(SAMPLE_MESSAGES));
                }
            } else if (data && data.length > 0) {
                if (isActive) {
                    setMessages(toDisplayMessages(data));
                }
            } else {
                if (isActive) {
                    setMessages(toDisplayMessages(SAMPLE_MESSAGES));
                }
            }
        };

        void fetchMessages();

        return () => {
            isActive = false;
        };
    }, [isPreview]);

    // リアルタイム更新：承認されたメッセージが自動で光の粒として出現
    useEffect(() => {
        if (isPreview || !supabase) return;

        const channel = supabase
            .channel('messages-realtime')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const newMsg = payload.new as MessageData & { is_approved?: boolean };
                    if (newMsg.is_approved) {
                        setMessages(prev => upsertDisplayMessage(prev, newMsg));
                    }
                }
            )
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'messages' },
                (payload) => {
                    const updated = payload.new as MessageData & { is_approved?: boolean };
                    if (updated.is_approved) {
                        // 承認された → 新しい光として前面に追加
                        setMessages(prev => upsertDisplayMessage(prev, updated));
                    } else {
                        // 非承認にされた → リストから削除
                        setMessages(prev => prev.filter(m => m.id !== updated.id));
                    }
                }
            )
            .on('postgres_changes',
                { event: 'DELETE', schema: 'public', table: 'messages' },
                (payload) => {
                    const deleted = payload.old as { id: string };
                    setMessages(prev => prev.filter(m => m.id !== deleted.id));
                }
            )
            .subscribe();

        return () => {
            supabase!.removeChannel(channel);
        };
    }, [isPreview]);

    const visibleMessages = messages
        .slice(0, MAX_VISIBLE_MESSAGE_PARTICLES)
        .map(placeVisibleMessage);
    const hiddenMessageCount = Math.max(messages.length - visibleMessages.length, 0);
    const activeMessage = messages.find(m => m.id === activeId);

    return (
        <section className="section-padding ornament-section storybook-message-section" style={{ position: "relative", zIndex: activeMessage || isArchiveOpen ? 1000 : 10, minHeight: "100dvh", overflow: "hidden" }}>
            <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1120px" }}>
                <div className="forest-panel" style={{ position: "relative", minHeight: "82dvh", overflow: "hidden", padding: "clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 2.5rem)" }}>

                    {/* Background Forest Layer */}
                    <div className="message-forest-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 1 }}>
                        <Image
                            className="message-forest-bg-image message-forest-bg-image--desktop"
                            src="/images/message-forest-castle-night.png"
                            alt=""
                            aria-hidden="true"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: 'normal' }}
                        />
                        <Image
                            className="message-forest-bg-image message-forest-bg-image--mobile"
                            src="/images/message-forest-castle-night-mobile.png"
                            alt=""
                            aria-hidden="true"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: 'normal' }}
                        />
                    </div>

                    <div className="message-forest-header" style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "4rem" }}>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-heading-rule"
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
                    <div className="message-lights-stage" style={{ position: "relative", zIndex: 10, width: "100%", height: "60vh", maxWidth: "1000px", margin: "0 auto" }}>
                        {visibleMessages.map((msg) => {
                            const isActive = activeId === msg.id;
                            const lightTheme = ["pink", "blue", "pure"].includes(msg.color_theme) ? msg.color_theme : "yellow";

                            return (
                                <motion.div
                                    key={msg.id}
                                    style={{
                                        position: "absolute",
                                        left: `calc(${msg.x}% - 30px)`,
                                        top: `calc(${msg.y}% - 30px)`,
                                        cursor: "pointer",
                                        zIndex: isActive ? 50 : 10,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: msg.scale }}
                                    viewport={{ once: true }}
                                    transition={{ delay: msg.revealDelay, duration: 1 }}
                                    onClick={() => setActiveId(isActive ? null : msg.id)}
                                >
                                    {/* Particle Sparkle */}
                                    <motion.div
                                        animate={{
                                            y: [0, msg.floatOffset, 0],
                                            opacity: [0.6, 1, 0.6],
                                            scale: [1, 1.1, 1],
                                            rotate: [0, msg.rotateAmplitude, -msg.rotateAmplitude, 0],
                                        }}
                                        transition={{
                                            duration: msg.floatDuration,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{ position: 'relative', width: "60px", height: "60px", margin: "0 auto" }}
                                        className="flex-center"
                                    >
                                        <div
                                            className={`message-light-orb message-light-orb--${lightTheme}`}
                                            aria-hidden="true"
                                        />
                                    </motion.div>

                                    {/* Popup Message was moved out to a modal */}
                                </motion.div>
                            );
                        })}
                    </div>

                    {hiddenMessageCount > 0 && (
                        <div className="message-forest-actions flex-center" style={{ gap: "0.8rem", flexWrap: "wrap", marginTop: "2rem", zIndex: 10, position: "relative" }}>
                            <button
                                type="button"
                                onClick={() => setIsArchiveOpen(true)}
                                style={{
                                    background: "rgba(var(--color-forest-dark-rgb), 0.44)",
                                    border: "1px solid rgba(var(--color-accent-rgb), 0.45)",
                                    borderRadius: "30px",
                                    color: "var(--color-accent-light)",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.02rem",
                                    letterSpacing: "0.04em",
                                    padding: "0.75rem 1.5rem",
                                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                                }}
                            >
                                すべての光を見る
                            </button>
                        </div>
                    )}

                    {/* Decorative Crown Layer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.16 }}
                        transition={{ duration: 2 }}
                        className="message-crown-decoration"
                        style={{ position: 'absolute', bottom: "-10%", right: "-5%", width: "40%", height: "40%", pointerEvents: 'none' }}
                    >
                        <Image
                            src="/images/crown.png"
                            alt="Crown Decoration"
                            fill
                            sizes="(max-width: 768px) 40vw, 28vw"
                            style={{ objectFit: "contain", objectPosition: "bottom right", mixBlendMode: 'screen' }}
                        />
                    </motion.div>
                </div>
            </div>

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
                            backgroundColor: "rgba(var(--color-primary-dark-rgb), 0.84)",
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
                                boxShadow: "0 20px 50px rgba(var(--color-ink-rgb), 0.22)",
                                border: "1px solid rgba(var(--color-accent-rgb), 0.3)"
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
                                「{activeMessage.content}」
                            </p>
                            <div style={{ color: "var(--color-accent)" }}>
                                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{activeMessage.sender_name}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Overlay for All Messages */}
            <AnimatePresence>
                {isArchiveOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(var(--color-primary-dark-rgb), 0.86)",
                            backdropFilter: "blur(5px)",
                            zIndex: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem"
                        }}
                        onClick={() => setIsArchiveOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-panel"
                            style={{
                                width: "100%",
                                maxWidth: "560px",
                                maxHeight: "82dvh",
                                padding: "2.5rem 1.4rem 1.4rem",
                                position: "relative",
                                textAlign: "left",
                                boxShadow: "0 20px 50px rgba(var(--color-ink-rgb), 0.22)",
                                border: "1px solid rgba(var(--color-accent-rgb), 0.3)",
                                overflow: "hidden",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsArchiveOpen(false)}
                                aria-label="閉じる"
                                style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "var(--color-text-muted)", fontSize: "1.8rem", cursor: "pointer", padding: "5px" }}
                            >
                                ×
                            </button>
                            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                                <h4 style={{ color: "var(--color-accent)", fontSize: "1.45rem", marginBottom: "0.35rem" }}>
                                    届いた光
                                </h4>
                                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                                    {messages.length}通
                                </p>
                            </div>
                            <div style={{ display: "grid", gap: "0.75rem", maxHeight: "58dvh", overflowY: "auto", padding: "0.15rem 0.25rem 0.6rem" }}>
                                {messages.map((message) => (
                                    <button
                                        key={message.id}
                                        type="button"
                                        onClick={() => {
                                            setIsArchiveOpen(false);
                                            setActiveId(message.id);
                                        }}
                                        style={{
                                            background: "rgba(var(--color-paper-light-rgb), 0.68)",
                                            border: "1px solid rgba(var(--color-gold-rgb), 0.22)",
                                            borderRadius: "10px",
                                            color: "var(--color-text)",
                                            cursor: "pointer",
                                            padding: "0.9rem 1rem",
                                            textAlign: "left",
                                            width: "100%",
                                        }}
                                    >
                                        <span style={{ display: "block", color: "var(--color-accent)", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                                            {message.sender_name}
                                        </span>
                                        <span style={{ display: "block", color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                            {message.content}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
