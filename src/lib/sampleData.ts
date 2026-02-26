/**
 * プレビューモード用サンプルデータ
 * ?preview=true またはDB未接続時に使用
 */

// ── MessagesSection 用 ──
export type SampleMessage = {
    id: string;
    sender_name: string;
    content: string;
    color_theme: string;
    x: number;
    y: number;
    scale: number;
};

export const SAMPLE_MESSAGES: SampleMessage[] = [
    { id: "sample-1", sender_name: "Maria（オーロラ姫）", content: "初めてのトウシューズで緊張しますが、一生懸命がんばります！", color_theme: "yellow", x: 15, y: 30, scale: 1.0 },
    { id: "sample-2", sender_name: "Yuki（リラの精）", content: "妖精の踊り、笑顔で踊りきります！", color_theme: "pink", x: 70, y: 40, scale: 0.8 },
    { id: "sample-3", sender_name: "Sora（ワルツ）", content: "みんなと息を合わせて綺麗な円を描きたいです。", color_theme: "blue", x: 45, y: 60, scale: 1.2 },
    { id: "sample-4", sender_name: "Aoi（フロリナ王女）", content: "失敗を恐れずに、楽しんで踊ります！", color_theme: "yellow", x: 80, y: 70, scale: 0.9 },
    { id: "sample-5", sender_name: "Hina（宝石の精）", content: "練習の成果を全部出し切ります！", color_theme: "pure", x: 25, y: 75, scale: 1.1 },
];

// ── 管理画面プレビュー用（承認・未承認混在） ──
export type SampleAdminMessage = {
    id: string;
    sender_name: string;
    content: string;
    color_theme: string;
    is_approved: boolean;
    created_at: string;
};

export const SAMPLE_ADMIN_MESSAGES: SampleAdminMessage[] = [
    { id: "sample-1", sender_name: "Maria（オーロラ姫）", content: "初めてのトウシューズで緊張しますが、一生懸命がんばります！", color_theme: "yellow", is_approved: true, created_at: "2026-02-20T10:00:00Z" },
    { id: "sample-2", sender_name: "Yuki（リラの精）", content: "妖精の踊り、笑顔で踊りきります！", color_theme: "pink", is_approved: true, created_at: "2026-02-20T11:30:00Z" },
    { id: "sample-3", sender_name: "Sora（ワルツ）", content: "みんなと息を合わせて綺麗な円を描きたいです。", color_theme: "blue", is_approved: false, created_at: "2026-02-21T09:15:00Z" },
    { id: "sample-4", sender_name: "Aoi（フロリナ王女）", content: "失敗を恐れずに、楽しんで踊ります！", color_theme: "yellow", is_approved: true, created_at: "2026-02-21T14:00:00Z" },
    { id: "sample-5", sender_name: "Hina（宝石の精）", content: "練習の成果を全部出し切ります！", color_theme: "pure", is_approved: false, created_at: "2026-02-22T08:45:00Z" },
];
