"use client";

import { useEffect, useState } from "react";

import { SAMPLE_ADMIN_MESSAGES } from "../../lib/sampleData";
import { supabase } from "../../lib/supabaseClient";

type Message = {
  id: string;
  sender_name: string;
  content: string;
  color_theme: string;
  is_approved: boolean;
  created_at: string;
};

type AdminSessionResponse = {
  authenticated: boolean;
  configured: boolean;
  error?: string;
};

type PinGateProps = {
  configured: boolean;
  message: string | null;
  onAuthenticated: () => Promise<void>;
};

function PinGate({ configured, message, onAuthenticated }: PinGateProps) {
  const [pin, setPin] = useState("");
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorMessage = localErrorMessage ?? message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!configured || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setLocalErrorMessage(null);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as AdminSessionResponse | null;

        if (result?.error === "invalid_pin") {
          setLocalErrorMessage("PINが正しくありません");
        } else if (result?.error === "not_configured") {
          setLocalErrorMessage("サーバー環境変数 ADMIN_PIN が未設定です");
        } else {
          setLocalErrorMessage("ログインに失敗しました");
        }

        setPin("");
        return;
      }

      setPin("");
      await onAuthenticated();
    } catch (error) {
      console.error("Error creating admin session:", error);
      setLocalErrorMessage("ログインに失敗しました。時間をおいて再度お試しください。");
      setPin("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050A11",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        padding: "1.5rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "12px",
          padding: "3rem 2.5rem",
          width: "100%",
          maxWidth: "380px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔒</div>
        <h1
          style={{
            color: "var(--color-accent)",
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-heading)",
          }}
        >
          管理画面
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          {configured
            ? "サーバー側で検証されるPINコードを入力してください"
            : "ADMIN_PIN が未設定のためログインできません"}
        </p>

        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(event) => {
            setPin(event.target.value);
            setLocalErrorMessage(null);
          }}
          placeholder="PIN"
          autoFocus
          disabled={!configured || isSubmitting}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: errorMessage ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "1.2rem",
            textAlign: "center",
            letterSpacing: "0.3em",
            outline: "none",
            marginBottom: "0.5rem",
          }}
        />
        {errorMessage && (
          <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={!configured || isSubmitting}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginTop: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--color-accent)",
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            color: "var(--color-accent)",
            fontSize: "1rem",
            cursor: configured && !isSubmitting ? "pointer" : "not-allowed",
            fontWeight: "bold",
            opacity: configured ? 1 : 0.5,
          }}
        >
          {isSubmitting ? "確認中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}

async function readAdminSession() {
  const response = await fetch("/api/admin/session", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to read admin session");
  }

  return (await response.json()) as AdminSessionResponse;
}

async function loadAdminMessages() {
  if (!supabase) {
    return SAMPLE_ADMIN_MESSAGES;
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Message[];
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authConfigured, setAuthConfigured] = useState(true);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshMessages = async () => {
    setLoading(true);

    try {
      const nextMessages = await loadAdminMessages();
      setMessages(nextMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      window.alert("メッセージの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      try {
        const session = await readAdminSession();

        if (!isActive) {
          return;
        }

        setAuthConfigured(session.configured);
        setAuthenticated(session.authenticated);
        setAuthMessage(
          session.configured
            ? null
            : "サーバー環境変数 ADMIN_PIN を設定するとログインできます",
        );

        if (session.authenticated) {
          const nextMessages = await loadAdminMessages();

          if (isActive) {
            setMessages(nextMessages);
          }

          return;
        }
      } catch (error) {
        console.error("Error checking admin session:", error);

        if (!isActive) {
          return;
        }

        setAuthenticated(false);
        setAuthMessage("認証状態を確認できませんでした。ページを再読み込みしてください。");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      isActive = false;
    };
  }, []);

  const handleAuthenticated = async () => {
    setAuthMessage(null);
    setAuthenticated(true);
    await refreshMessages();
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    if (!supabase) {
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? { ...message, is_approved: !currentStatus }
            : message,
        ),
      );
      return;
    }

    const { error } = await supabase
      .from("messages")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating message:", error);
      window.alert("更新に失敗しました。");
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === id ? { ...message, is_approved: !currentStatus } : message,
      ),
    );
  };

  const deleteMessage = async (id: string) => {
    const confirmDelete = window.confirm("このメッセージを完全に削除しますか？");

    if (!confirmDelete) {
      return;
    }

    if (!supabase) {
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id),
      );
      return;
    }

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      console.error("Error deleting message:", error);
      window.alert("削除に失敗しました。");
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== id),
    );
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch (error) {
      console.error("Error clearing admin session:", error);
    }

    setAuthenticated(false);
    setMessages([]);
    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "white",
          backgroundColor: "#050A11",
          minHeight: "100vh",
        }}
      >
        読み込み中...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <PinGate
        configured={authConfigured}
        message={authMessage}
        onAuthenticated={handleAuthenticated}
      />
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#050A11",
        minHeight: "100vh",
        color: "white",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ color: "var(--color-accent)" }}>運営管理画面：メッセージ承認</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => {
              void refreshMessages();
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            更新
          </button>
          <button
            onClick={() => {
              void handleLogout();
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              color: "#f87171",
              border: "1px solid rgba(255,0,0,0.3)",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ログアウト
          </button>
        </div>
      </div>

      {!supabase && (
        <div
          style={{
            padding: "0.8rem 1.2rem",
            marginBottom: "1.5rem",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "8px",
            color: "var(--color-accent)",
            fontSize: "0.9rem",
          }}
        >
          DB未接続: サンプルデータを表示しています
        </div>
      )}

      {messages.length === 0 ? (
        <p>メッセージはありません。</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  message.is_approved ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"
                }`,
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "0.8rem",
                  color: message.is_approved ? "#4ade80" : "#f87171",
                }}
              >
                {message.is_approved ? "承認済" : "未承認"}
              </div>

              <p style={{ fontSize: "0.8rem", color: "gray", marginBottom: "0.5rem" }}>
                {new Date(message.created_at).toLocaleString("ja-JP")}
              </p>

              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "var(--color-accent)",
                }}
              >
                {message.sender_name}
              </p>

              <p
                style={{
                  marginBottom: "1rem",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.95rem",
                }}
              >
                {message.content}
              </p>

              <p style={{ fontSize: "0.8rem", color: "gray", marginBottom: "1rem" }}>
                テーマ: {message.color_theme}
              </p>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => {
                    void toggleApproval(message.id, message.is_approved);
                  }}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: message.is_approved
                      ? "rgba(255,255,255,0.1)"
                      : "#1E3E62",
                    color: "white",
                  }}
                >
                  {message.is_approved ? "非表示にする" : "承認する"}
                </button>
                <button
                  onClick={() => {
                    void deleteMessage(message.id);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,0,0,0.5)",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "#f87171",
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
