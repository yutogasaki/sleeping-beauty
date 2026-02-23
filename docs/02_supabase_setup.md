# Supabase データベース構築手順 (Phase 4)

Phase 4の実装を進めるために、Supabaseプロジェクトの作成とテーブルの準備をお願いいたします。

## 手順 1: プロジェクトの作成と環境変数の設定

1. [Supabase](https://supabase.com/) にログインし、新しいプロジェクトを作成してください。
2. プロジェクトのダッシュボードから `Project Settings` > `API` を開きます。
3. `Project URL` と `Project API Keys` の `anon` (public) キーをコピーします。
4. このリポジトリのルートディレクトリ（`package.json` がある階層）に `.env.local` という名前の新しいファイルを作成し、以下の形式で貼り付けてください。

```env
NEXT_PUBLIC_SUPABASE_URL=あなたのSupabaseのURLをここに貼り付け
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabaseのanonキーをここに貼り付け
```

## 手順 2: データベーステーブルの作成

Supabaseダッシュボードの左メニューから **"SQL Editor"** を開き、「New query」を作成して以下のSQL文を貼り付け、**"Run" (実行)** してください。

```sql
-- 意気込みメッセージを保存するテーブルの作成
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_name text not null,            -- 送信者の名前（ニックネーム可）
  content text not null,                -- メッセージ本文
  color_theme text not null,            -- 光の粒の色（例：pink, blue, yellow, pure）
  is_approved boolean default false,     -- 管理者の承認フラグ（デフォルトは未承認で非表示）
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) の設定
-- 匿名ユーザー(フロントエンド)は「INSERT(投稿)」と「自身のSELECT(承認済みのみ表示)」を許可する
alter table public.messages enable row level security;

-- ポリシー1: 誰でもメッセージを投稿（INSERT）できる
create policy "Anyone can insert messages"
  on public.messages for insert
  with check (true);

-- ポリシー2: 誰でも「承認された（is_approved = true）」メッセージを閲覧（SELECT）できる
create policy "Anyone can read approved messages"
  on public.messages for select
  using (is_approved = true);

-- （備考: UPDATE/DELETE は現状設定せず、運営のみがダッシュボードから行えるように別ポリシーかSupabase画面で行います）
```

## 手順 3: 完了の報告

`.env.local` の作成とSQLの実行が終わりましたら、その旨を私（AI）にお伝えください。
確認でき次第、光の粒の投稿・表示機能（Phase 4 Step 2）の実装に進みます！
