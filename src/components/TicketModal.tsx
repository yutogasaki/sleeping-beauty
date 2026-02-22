"use client";

import { motion, AnimatePresence } from "framer-motion";

type TicketModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(5, 10, 17, 0.9)",
                        backdropFilter: "blur(8px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                        transformStyle: "preserve-3d",
                        perspective: "1000px"
                    }}
                    onClick={onClose}
                >
                    {/* Ticket Body */}
                    <motion.div
                        initial={{ rotateX: 90, opacity: 0, y: 50 }}
                        animate={{ rotateX: 0, opacity: 1, y: 0 }}
                        exit={{ rotateX: -90, opacity: 0, y: -50 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        style={{
                            width: "100%",
                            maxWidth: "350px",
                            background: "linear-gradient(135deg, rgba(30, 62, 98, 0.95) 0%, rgba(11, 25, 44, 0.95) 100%)",
                            borderRadius: "15px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(212, 175, 55, 0.3)",
                            overflow: "hidden",
                            position: "relative"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Ticket Header (Gold trim) */}
                        <div style={{
                            height: "40px",
                            background: "linear-gradient(to right, #D4AF37, #FBF8CC, #D4AF37)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "#050a11", fontWeight: "bold", letterSpacing: "0.2em", fontSize: "0.9rem" }}>
                                GUEST TICKET
                            </span>
                        </div>

                        {/* Ticket Content */}
                        <div style={{ padding: "2rem", textAlign: "center", position: "relative" }}>
                            {/* Background texture for the ticket */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                                backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.05) 1px, transparent 1px)",
                                backgroundSize: "10px 10px", pointerEvents: "none"
                            }} />

                            <h2 style={{ color: "var(--color-text)", fontSize: "1.8rem", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                                眠れる森の美女
                            </h2>
                            <p style={{ color: "var(--color-accent)", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "2rem" }}>
                                AYAMI BALLET STUDIO
                            </p>

                            <div style={{ borderTop: "1px dashed rgba(212, 175, 55, 0.3)", borderBottom: "1px dashed rgba(212, 175, 55, 0.3)", padding: "1.5rem 0", marginBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>DATE</span>
                                    <span style={{ color: "var(--color-text)", fontWeight: "bold", fontSize: "1.1rem" }}>2026.08.23</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>OPEN</span>
                                    <span style={{ color: "var(--color-text)", fontWeight: "bold", fontSize: "1.1rem" }}>14:30</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>SEAT</span>
                                    <span style={{ color: "var(--color-accent-light)", fontWeight: "bold", fontSize: "1.1rem" }}>全席自由</span>
                                </div>
                            </div>

                            {/* Mock QR Code space */}
                            <div className="flex-center" style={{ marginBottom: "1.5rem" }}>
                                <div style={{
                                    width: "120px", height: "120px",
                                    background: "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(212, 175, 55, 0.3)",
                                    borderRadius: "10px",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>[ QR CODE ]</span>
                                </div>
                            </div>
                            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>入場時にこの画面をスタッフにご提示ください</p>

                            <button
                                onClick={onClose}
                                style={{
                                    marginTop: "1.5rem",
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--color-text-muted)",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    fontSize: "0.9rem"
                                }}
                            >
                                閉じる
                            </button>
                        </div>

                        {/* Cutout effects for ticket edges */}
                        <div style={{ position: "absolute", top: "40px", left: "-10px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(5, 10, 17, 0.9)" }} />
                        <div style={{ position: "absolute", top: "40px", right: "-10px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(5, 10, 17, 0.9)" }} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
