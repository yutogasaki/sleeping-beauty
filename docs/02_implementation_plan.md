---
title: 眠りの森の美女 発表会アプリ 実装計画 (Phase 1)
date: 2026-02-22
---

# Webアプリ最初のステップ（フロントエンド/モック構築）

ユーザーの心震える体験を最優先し、まずはDB(Supabase)を使わずにVercelへの展開および見た目の検証を行うためのReact/Next.jsプロジェクトを構築します。

## Step 1: プロジェクトのセットアップ
- `npx create-next-app`によるNext.js (App Router, TailwindCSS/VanillaCSS, TypeScript) の初期化
  - 構成ツール: `React`, `Next.js 15+`, `TailwindCSS` (※リクエストにより原則VanillaCSSですが、Next.jsの標準機能との兼ね合いで確認・調整。世界観を素早く、レスポンシブかつ美しく構築するため、今回はTailwindを使用するか、CSS Modulesとframer-motion等のアニメーションライブラリで構築します。ユーザーへTailwindの可否を確認しつつ、まずは標準構成で立ち上げます。)
  - ★指定により、TailwindCSSの使用はユーザーの許可が必要です。今回は、ViteではなくNext.jsで構築しつつ、`css/` 内にVanilla CSSを用意するか、`CSS Modules`でカプセル化しつつ、グローバルなテーマカラーを連携します。
- `framer-motion` のインストール（リッチなアニメーション・世界観演出に必須）
- パッケージ: `lucide-react` (アイコン用), `clsx`, `tailwind-merge` etc.

## Step 2: アセット（画像）の配置
- 既存の `images` フォルダ内の画像をNext.jsの `public/images/` へ移動（またはコピー）し、最適化されたコンポーネント(`next/image`)で読み込めるようにします。

## Step 3: グローバルスタイリング (index.css / global.css)
- `:root` にデザインシステムのカラーパレット（Royal Blue/Gold）を定義
- 背景全体を暗く美しい森の世界に設定
- Google Fonts から `Shippori Mincho` および `Inter` 等をインポートし、グローバルに適用

## Step 4: UIコンポーネントの構築
- **MainHero (パララックス構造의再構築)**: 
  - メインビジュアル（森＋城・背景テクスチャ等）を遠景（低速スクロール）に設定。
  - タイトルと案内文を中景（標準スクロール）として中央に浮遊させる。
  - **オーロラ姫シルエット** および **群舞シルエット** を近景（高速スクロール）として画面下部～両サイドに大きく配置。不透明度やブラー効果を活用し、視線を中央のタイトルへ誘導する立体的な空間を完成させる。
- **LightParticle**: 「意気込みの光」を可視化（⑨光の粒などを用いてふわふわ浮遊させる演出）
- **MessagesSection**: モックデータとして数件の「意気込み」をカード状（または光源）として配置し、タップで浮かび上がる表現

## Step 5: 動作確認とVercelへのデプロイ
- `npm run dev` によるローカル確認
- Vercel上でのプレビュー公開を目指すためのビルド (`npm run build`) 検証
- (本環境でのコマンド自動実行のため、デプロイ自体はVercel CLI、もしくはGit Pushを通じて行われる前提としてコードを整えます)
