"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    MESSAGE_COLOR_OPTIONS,
    MESSAGE_LIMITS,
    type MessageSubmissionInput,
    validateMessageSubmission,
} from "../lib/messageSubmission";
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

export default function MessagesSection() {
    const isPreview = usePreview();
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formError, setFormError] = useState<string | null>(null);
    const [showFieldErrors, setShowFieldErrors] = useState(false);

    // フォーム用ステート
    const [formData, setFormData] = useState<MessageSubmissionInput>({
        name: "",
        role: "",
        message: "",
        color: "yellow",
        website: "",
    });
    const formValidation = validateMessageSubmission(formData);
    const fieldErrors = showFieldErrors ? formValidation.fieldErrors : {};
    const isSubmitDisabled = formStatus === 'submitting' || !formValidation.ok;

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
                        setMessages(prev => [...prev, createDisplayMessage(newMsg)]);
                    }
                }
            )
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'messages' },
                (payload) => {
                    const updated = payload.new as MessageData & { is_approved?: boolean };
                    if (updated.is_approved) {
                        // 承認された → リストになければ追加
                        setMessages(prev => {
                            const exists = prev.some(m => m.id === updated.id);
                            if (exists) return prev;
                            return [...prev, createDisplayMessage(updated)];
                        });
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

    const activeMessage = messages.find(m => m.id === activeId);

    const handleOpenForm = () => {
        setFormError(null);
        setShowFieldErrors(false);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormError(null);
        setShowFieldErrors(false);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowFieldErrors(true);
        setFormError(null);

        if (!formValidation.ok) {
            return;
        }

        setFormStatus('submitting');

        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = (await response.json().catch(() => null)) as {
                accepted?: boolean;
                message?: string;
            } | null;

            if (!response.ok || !result?.accepted) {
                setFormError(result?.message ?? "エラーが発生しました。もう一度お試しください。");
                setFormStatus('idle');
                return;
            }
        } catch (error) {
            console.error("Error submitting message:", error);
            setFormError("通信に失敗しました。時間をおいて再度お試しください。");
            setFormStatus('idle');
            return;
        }

        setFormStatus('success');
        setTimeout(() => {
            setIsFormOpen(false);
            setFormStatus('idle');
            setFormError(null);
            setShowFieldErrors(false);
            setFormData({ name: "", role: "", message: "", color: "yellow", website: "" });
        }, 3000);
    };

    return (
        <section className="section-padding ornament-section" style={{ position: "relative", zIndex: activeMessage || isFormOpen ? 1000 : 10, minHeight: "100dvh", overflow: "hidden" }}>
            <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1120px" }}>
                <div className="forest-panel" style={{ position: "relative", minHeight: "82dvh", overflow: "hidden", padding: "clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 2.5rem)" }}>

                    {/* Background Forest Layer */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.46 }}>
                        <Image
                            src="/images/rose_full_bg.png"
                            alt="Forest and Roses"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center", mixBlendMode: 'screen' }}
                        />
                    </div>

                    <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "4rem" }}>
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
                    <div style={{ position: "relative", zIndex: 10, width: "100%", height: "60vh", maxWidth: "1000px", margin: "0 auto" }}>
                        {messages.map((msg) => {
                            const isActive = activeId === msg.id;

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
                        <button className="btn-primary" onClick={handleOpenForm}>
                            意気込みを投稿する（生徒専用）
                        </button>
                    </div>

                    {/* Decorative Crown Layer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.16 }}
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
                        onClick={handleCloseForm}
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
                                boxShadow: "0 20px 50px rgba(var(--color-ink-rgb), 0.22)",
                                border: "1px solid rgba(var(--color-accent-rgb), 0.3)"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleCloseForm}
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
                                    <div style={{ width: '76px', height: '76px', marginBottom: '1rem', filter: 'drop-shadow(0 8px 14px rgba(var(--color-gold-rgb), 0.28))', position: 'relative' }}>
                                        <Image src="/images/light_particle.png" alt="" fill sizes="76px" style={{ objectFit: "contain" }} />
                                    </div>
                                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.8rem', fontSize: '1.4rem' }}>意気込みが森に宿りました</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>運営の確認後、<br />光の粒となって現れます。</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <h4 style={{ color: "var(--color-accent)", marginBottom: "1.5rem", textAlign: "center", fontSize: "1.4rem" }}>意気込みを投稿する</h4>
                                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center", lineHeight: 1.6 }}>
                                        承認後に森へ現れます。連続投稿を防ぐため、送信後は少し時間をおいて再投稿できます。
                                    </p>

                                    <input
                                        type="text"
                                        name="website"
                                        autoComplete="off"
                                        tabIndex={-1}
                                        value={formData.website}
                                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                                        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                                        aria-hidden="true"
                                    />

                                    {formError && (
                                        <p style={{ color: "#fda4af", fontSize: "0.9rem", marginBottom: "1rem", textAlign: "center" }}>
                                            {formError}
                                        </p>
                                    )}

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                                            お名前（ニックネーム可）
                                            <span style={{ float: "right" }}>{formData.name.length}/{MESSAGE_LIMITS.name}</span>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            maxLength={MESSAGE_LIMITS.name}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            aria-invalid={Boolean(fieldErrors.name)}
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                borderRadius: "8px",
                                                background: "rgba(var(--color-paper-light-rgb), 0.72)",
                                                border: fieldErrors.name ? "1px solid #c85f68" : "1px solid var(--color-line)",
                                                color: "var(--color-text)",
                                                outline: "none"
                                            }}
                                        />
                                        {fieldErrors.name && (
                                            <p style={{ color: "#fda4af", fontSize: "0.8rem", marginTop: "0.4rem" }}>{fieldErrors.name}</p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                                            演目・配役など（任意）
                                            <span style={{ float: "right" }}>{formData.role.length}/{MESSAGE_LIMITS.role}</span>
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={MESSAGE_LIMITS.role}
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="例：ワルツ、妖精など"
                                            aria-invalid={Boolean(fieldErrors.role)}
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                borderRadius: "8px",
                                                background: "rgba(var(--color-paper-light-rgb), 0.72)",
                                                border: fieldErrors.role ? "1px solid #c85f68" : "1px solid var(--color-line)",
                                                color: "var(--color-text)",
                                                outline: "none"
                                            }}
                                        />
                                        {fieldErrors.role && (
                                            <p style={{ color: "#fda4af", fontSize: "0.8rem", marginTop: "0.4rem" }}>{fieldErrors.role}</p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: "1.2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>光の粒の色</label>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            {MESSAGE_COLOR_OPTIONS.map(option => (
                                                <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "0.3rem", cursor: "pointer", color: "var(--color-text)", fontSize: "0.9rem" }}>
                                                    <input type="radio" name="color" value={option.value} checked={formData.color === option.value} onChange={() => setFormData({ ...formData, color: option.value })} />
                                                    {option.label}
                                                </label>
                                            ))}
                                        </div>
                                        {fieldErrors.color && (
                                            <p style={{ color: "#fda4af", fontSize: "0.8rem", marginTop: "0.4rem" }}>{fieldErrors.color}</p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: "2rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                                            意気込みメッセージ
                                            <span style={{ float: "right" }}>{formData.message.length}/{MESSAGE_LIMITS.message}</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            maxLength={MESSAGE_LIMITS.message}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            aria-invalid={Boolean(fieldErrors.message)}
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                borderRadius: "8px",
                                                background: "rgba(var(--color-paper-light-rgb), 0.72)",
                                                border: fieldErrors.message ? "1px solid #c85f68" : "1px solid var(--color-line)",
                                                color: "var(--color-text)",
                                                resize: "none",
                                                outline: "none"
                                            }}
                                        />
                                        {fieldErrors.message && (
                                            <p style={{ color: "#fda4af", fontSize: "0.8rem", marginTop: "0.4rem" }}>{fieldErrors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ width: "100%", opacity: formStatus === 'submitting' ? 0.7 : 1 }}
                                        disabled={isSubmitDisabled}
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
