"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Message = {
    id: string;
    sender_name: string;
    content: string;
    color_theme: string;
    is_approved: boolean;
    created_at: string;
};

export default function AdminPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
            alert("メッセージの取得に失敗しました。");
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        if (!supabase) return;
        // 悲観的UI更新（先に戻してから失敗したら戻すこともできるが、ここでは通信待ちにする）
        const { error } = await supabase
            .from("messages")
            .update({ is_approved: !currentStatus })
            .eq("id", id);

        if (error) {
            console.error("Error updating message:", error);
            alert("更新に失敗しました。");
        } else {
            // UIを更新
            setMessages(messages.map(m => m.id === id ? { ...m, is_approved: !currentStatus } : m));
        }
    };

    const deleteMessage = async (id: string) => {
        if (!supabase) return;
        const confirmDelete = window.confirm("このメッセージを完全に削除しますか？");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from("messages")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting message:", error);
            alert("削除に失敗しました。");
        } else {
            setMessages(messages.filter(m => m.id !== id));
        }
    };

    if (loading) {
        return <div style={{ padding: "2rem", color: "white" }}>読み込み中...</div>;
    }

    return (
        <div style={{ padding: "2rem", backgroundColor: "#050A11", minHeight: "100vh", color: "white", fontFamily: "var(--font-body)" }}>
            <h1 style={{ color: "var(--color-accent)", marginBottom: "2rem" }}>運営管理画面：メッセージ承認</h1>

            <button
                onClick={fetchMessages}
                style={{ marginBottom: "1rem", padding: "0.5rem 1rem", backgroundColor: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "4px", cursor: "pointer" }}
            >
                更新
            </button>

            {messages.length === 0 ? (
                <p>メッセージはありません。</p>
            ) : (
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            padding: "1rem",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: `1px solid ${msg.is_approved ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`,
                            borderRadius: "8px",
                            position: "relative"
                        }}>
                            <div style={{ position: "absolute", top: "10px", right: "10px", fontSize: "0.8rem", color: msg.is_approved ? '#4ade80' : '#f87171' }}>
                                {msg.is_approved ? '承認済' : '未承認'}
                            </div>

                            <p style={{ fontSize: "0.8rem", color: "gray", marginBottom: "0.5rem" }}>
                                {new Date(msg.created_at).toLocaleString('ja-JP')}
                            </p>

                            <p style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "var(--color-accent)" }}>
                                {msg.sender_name}
                            </p>

                            <p style={{ marginBottom: "1rem", whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
                                {msg.content}
                            </p>

                            <p style={{ fontSize: "0.8rem", color: "gray", marginBottom: "1rem" }}>
                                テーマ: {msg.color_theme}
                            </p>

                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                    onClick={() => toggleApproval(msg.id, msg.is_approved)}
                                    style={{
                                        flex: 1, padding: "0.5rem", borderRadius: "4px", border: "none", cursor: "pointer",
                                        backgroundColor: msg.is_approved ? "rgba(255,255,255,0.1)" : "#1E3E62",
                                        color: "white"
                                    }}
                                >
                                    {msg.is_approved ? '非表示にする' : '承認する'}
                                </button>
                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    style={{
                                        padding: "0.5rem 1rem", borderRadius: "4px", border: "1px solid rgba(255,0,0,0.5)", cursor: "pointer",
                                        backgroundColor: "transparent", color: "#f87171"
                                    }}
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
