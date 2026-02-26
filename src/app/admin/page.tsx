"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { SAMPLE_ADMIN_MESSAGES } from "../../lib/sampleData";

type Message = {
    id: string;
    sender_name: string;
    content: string;
    color_theme: string;
    is_approved: boolean;
    created_at: string;
};

// ── PIN認証コンポーネント ──
function PinGate({ onAuthenticated }: { onAuthenticated: () => void }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN;
        if (!adminPin || pin === adminPin) {
            sessionStorage.setItem("admin_auth", "true");
            onAuthenticated();
        } else {
            setError(true);
            setPin("");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#050A11",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-body)",
        }}>
            <form onSubmit={handleSubmit} style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "12px",
                padding: "3rem 2.5rem",
                width: "100%",
                maxWidth: "380px",
                textAlign: "center",
            }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔒</div>
                <h1 style={{
                    color: "var(--color-accent)",
                    fontSize: "1.3rem",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-heading)",
                }}>
                    管理画面
                </h1>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                    PINコードを入力してください
                </p>

                <input
                    type="password"
                    inputMode="numeric"
                    value={pin}
                    onChange={e => { setPin(e.target.value); setError(false); }}
                    placeholder="PIN"
                    autoFocus
                    style={{
                        width: "100%",
                        padding: "0.9rem",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.05)",
                        border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.15)",
                        color: "white",
                        fontSize: "1.2rem",
                        textAlign: "center",
                        letterSpacing: "0.3em",
                        outline: "none",
                        marginBottom: "0.5rem",
                    }}
                />
                {error && (
                    <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                        PINが正しくありません
                    </p>
                )}

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "0.8rem",
                        marginTop: "1rem",
                        borderRadius: "8px",
                        border: "1px solid var(--color-accent)",
                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                        color: "var(--color-accent)",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    ログイン
                </button>
            </form>
        </div>
    );
}

// ── メイン管理画面 ──
export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    // セッション確認
    useEffect(() => {
        if (sessionStorage.getItem("admin_auth") === "true") {
            setAuthenticated(true);
        }
    }, []);

    const fetchMessages = async () => {
        if (!supabase) {
            // DB未接続時はサンプルデータを表示
            setMessages(SAMPLE_ADMIN_MESSAGES);
            setLoading(false);
            return;
        }
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
        if (authenticated) fetchMessages();
    }, [authenticated]);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        if (!supabase) {
            // プレビュー時はローカルのみ更新
            setMessages(messages.map(m => m.id === id ? { ...m, is_approved: !currentStatus } : m));
            return;
        }
        const { error } = await supabase
            .from("messages")
            .update({ is_approved: !currentStatus })
            .eq("id", id);

        if (error) {
            console.error("Error updating message:", error);
            alert("更新に失敗しました。");
        } else {
            setMessages(messages.map(m => m.id === id ? { ...m, is_approved: !currentStatus } : m));
        }
    };

    const deleteMessage = async (id: string) => {
        const confirmDelete = window.confirm("このメッセージを完全に削除しますか？");
        if (!confirmDelete) return;

        if (!supabase) {
            // プレビュー時はローカルのみ削除
            setMessages(messages.filter(m => m.id !== id));
            return;
        }
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

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        setAuthenticated(false);
    };

    // 認証前はPIN入力画面
    if (!authenticated) {
        return <PinGate onAuthenticated={() => setAuthenticated(true)} />;
    }

    if (loading) {
        return <div style={{ padding: "2rem", color: "white", backgroundColor: "#050A11", minHeight: "100vh" }}>読み込み中...</div>;
    }

    return (
        <div style={{ padding: "2rem", backgroundColor: "#050A11", minHeight: "100vh", color: "white", fontFamily: "var(--font-body)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <h1 style={{ color: "var(--color-accent)" }}>運営管理画面：メッセージ承認</h1>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                        onClick={fetchMessages}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "4px", cursor: "pointer" }}
                    >
                        更新
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "transparent", color: "#f87171", border: "1px solid rgba(255,0,0,0.3)", borderRadius: "4px", cursor: "pointer" }}
                    >
                        ログアウト
                    </button>
                </div>
            </div>

            {!supabase && (
                <div style={{
                    padding: "0.8rem 1.2rem",
                    marginBottom: "1.5rem",
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "8px",
                    color: "var(--color-accent)",
                    fontSize: "0.9rem",
                }}>
                    ⚠ DB未接続：サンプルデータを表示しています
                </div>
            )}

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
