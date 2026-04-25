# Website Content And Wire Handoff

## Purpose

他のAIまたは実装者に渡すための、Sleeping Beauty 公開サイトのコンテンツとワイヤーフレーム指示。
既存の実装を大きく壊さず、現在のプロジェクト方針「目覚めを待つ王国」「生徒の意気込みが光となり森に宿る」を保ったまま、トップページを磨くためのブリーフとして使う。

## Source Of Truth

- Product concept: `docs/01_concept_and_spec.md`
- Current page order: `src/components/HomeContent.tsx`
- Event data: `src/lib/eventDetails.ts`
- Guest data: `src/lib/guestArtists.ts`
- Program data: `src/lib/programDetails.ts`
- Sample messages: `src/lib/sampleData.ts`

## High-Level Brief For Another AI

AYAMI BALLET STUDIO 第4回発表会「眠れる森の美女」の公開サイトを、観客・保護者・出演者が本番前から世界観に入れるイベントページとして設計してください。

目的は、単なる告知ページではなく「発表会そのものが物語として始まっている」と感じさせることです。森、城、眠り、祝福、光、舞台幕、バレエの余白を使い、ロマンティックで舞台的な空気をつくってください。一方で、公演情報・チケット・会場・メッセージ投稿は迷わず使えるように、情報設計は明快にしてください。

既存アセットは `public/images/` にあります。特に `sleeping-beauty-hero-poster.png`, `rose_full_bg.png`, `light_particle.png`, `curtain.png`, `crown.png`, `rose.png` を優先して使ってください。背景や装飾は増やしすぎず、強い視覚アイデアは「舞台ポスター」と「光の粒」に絞るとよいです。

## Audience

- 来場予定の家族・友人
- 出演する生徒と保護者
- スタジオ関係者
- チケットや会場情報を確認したい一般閲覧者

## Tone

- 日本語中心。見出しは短く、詩的。ただし操作説明と公演情報は具体的に。
- ロマンティック、上品、舞台的、少し神秘的。
- 過度にファンタジー用語へ寄せすぎず、バレエ発表会として信頼できる読み味にする。
- 英字ラベルは補助程度。主情報は日本語。

## Required Event Facts

- 公演名: AYAMI BALLET STUDIO 第4回発表会「眠れる森の美女」
- 日時: 2026年8月23日（日）
- 開場/開演/終演予定: 14:30 開場 / 15:00 開演 / 17:00 終演（予定）
- 会場: 穂の国とよはし芸術劇場 PLAT 主ホール
- 座席: 全席自由
- 主催: AYAMI BALLET STUDIO
- 会場リンク: https://www.toyohashi-at.jp/
- スタジオ公式: https://ayami-ballet.com/
- Instagram: https://www.instagram.com/ayami.ballet.studio/

## Current Recommended Page Order

1. Hero
2. Prologue
3. Event Information
4. Cast And Characters
5. Messages / Light Particles
6. Digital Gift / Support, only if clearly marked as mock or wired to real payment
7. Behind The Scenes
8. Footer

Do not bring back the standalone countdown or standalone program carousel unless explicitly requested. The current direction is to keep the homepage cleaner and place public details near the top.

## Desktop Wire

```text
┌────────────────────────────────────────────────────────────┐
│ HERO                                                       │
│ Full-bleed stage poster / visual.                          │
│ No card over hero. Keep title accessible via h1/sr-only if │
│ the poster already contains the title.                     │
│ Optional bottom overlay: date, venue, 2 CTAs.               │
│ CTA 1: 来場用デジタルチケット                               │
│ CTA 2: 公演情報を見る                                       │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ PROLOGUE                                                   │
│ Centered, narrow poetic copy. Scroll/fade is acceptable.    │
│ Text should feel like a curtain opening into the story.      │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ EVENT INFORMATION                                          │
│ Left: date/time/venue/seat facts.                           │
│ Right: guest artists + program summary.                     │
│ Bottom: ticket CTA, calendar CTA, venue access link.         │
│ This section must be very scannable.                         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ CAST AND CHARACTERS                                        │
│ 5 cards in a responsive row/grid.                           │
│ Each card: role, dancer name, one concise description.       │
│ Avoid making cards too tall or text-heavy.                   │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ MESSAGES / LIGHTS                                          │
│ Rose/forest background. Floating light particles.            │
│ Left/top: section title and submit CTA.                      │
│ Main area: tap/click a light to read a message.              │
│ Modal/form: name, role, message, light color.                │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ SUPPORT / DIGITAL GIFT                                     │
│ Use only if mock state is visible, or payment is real.       │
│ 3 options max. Clear disclaimer when mock.                   │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ BEHIND THE SCENES                                          │
│ Timeline of rehearsal / preparation updates.                │
│ Replace placeholders with real images or remove image boxes. │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ FOOTER                                                     │
│ Compact event recap, links, contact note, copyright.         │
└────────────────────────────────────────────────────────────┘
```

## Mobile Wire

```text
HERO
- Poster fills first viewport width.
- Keep important title/date readable or provide visible compact overlay below poster.
- Primary CTA appears without needing to scroll too far.

PROLOGUE
- 1 column.
- Line lengths short enough for Japanese reading.
- Avoid text overlapping with fixed hero or animation layers.

EVENT INFORMATION
- Stack facts in this order:
  1. 日時
  2. 会場
  3. ゲスト
  4. 構成
  5. 主催/CTA
- CTA buttons must be full-width or at least easy to tap.

CAST
- 1 card per row or horizontal snap cards.
- Flip/tap behavior must not hide essential information from keyboard users.

MESSAGES
- Keep light area shorter than desktop.
- Submit CTA should be above the particle field.
- Message modal must fit within viewport and scroll internally if needed.

FOOTER
- Single column.
- Links should have enough tap spacing.
```

## Section Copy

### Hero

Primary accessible title:

```text
AYAMI BALLET STUDIO 第4回発表会
眠れる森の美女
```

Support copy:

```text
森が息をひそめ、王国は目覚めの時を待っている。
小さな光が集まり、舞台にひとつの物語が生まれます。
```

Fact line:

```text
2026年8月23日（日） 14:30 開場 / 15:00 開演
穂の国とよはし芸術劇場 PLAT 主ホール
```

CTA labels:

```text
来場用デジタルチケット
公演情報を見る
```

### Prologue

```text
ある王国に誕生した姫君オーロラ。
祝福の宴に集いし妖精たちが
美徳の贈り物を授けるさなか、
闇の妖精カラボスが姿を現し、
残酷な運命を告げます。

しかし、リラの精はその定めを書き換えました。
死ではなく、百年の眠りへと。

やがて目覚めのときは訪れる。
真実の愛とともに。
```

### Event Information

Heading:

```text
公演情報
```

Body:

```text
AYAMI BALLET STUDIO 第4回発表会「眠れる森の美女」
2026年8月23日（日）
14:30 開場 / 15:00 開演 / 17:00 終演（予定）
穂の国とよはし芸術劇場 PLAT 主ホール
全席自由
```

Guest artists:

```text
長谷川元志 / 神澤千景バレエスタジオ
彦坂 柚 / カイロ国立バレエ団
南野 高廣 / 松岡伶子バレエ団
```

Program summary:

```text
Chapter 1: バレエ作品
クラシック・バレエの華やかな幕開け

Chapter 2: 創作作品
多彩な世界が広がる創作作品集

Chapter 3: 眠れる森の美女
オーロラ姫の物語を描くメイン演目

※出演者・演目は変更となる場合がございます。
```

### Cast And Characters

Heading:

```text
物語を紡ぐ者たち
```

Cards:

```text
オーロラ姫 / 成田 寧音
16歳の誕生日に呪いを受け、百年の眠りにつく王女。気品と光をまとい、王国に愛される存在。

デジレ王子 / 長谷川元志
リラの精に導かれ、眠れる王国へと向かう王子。物語に目覚めをもたらす役どころ。

リラの精 / 甲斐 愛
知恵と希望を象徴する善の妖精。カラボスの呪いを和らげ、未来への道を残す。

カラボス / 伊藤 あゆみ
祝宴に影を落とし、姫の運命を動かす闇の妖精。物語に緊張を生む重要な存在。

青い鳥 / 南野 高廣
フロリナ姫とともに祝宴を彩る、軽やかで華やかな青い翼の役どころ。
```

### Messages / Light Particles

Heading:

```text
森に灯る光
```

Body:

```text
生徒たちの意気込みが光の粒となり、森を照らします。
光をタップして、それぞれの舞台へ向かう言葉をご覧ください。
```

Submit CTA:

```text
意気込みを灯す
```

Form fields:

```text
お名前
役名・クラスなど
メッセージ
光の色
```

Success message:

```text
光を受け取りました。
確認後、森の中に灯ります。
```

Empty/fallback message:

```text
まだ森は静かです。
最初の光を灯して、舞台への想いを届けましょう。
```

### Digital Gift / Support

Use this section carefully. If payment is not real, it must be clearly labeled as mock behavior.

Heading:

```text
王国への贈り物
```

Body:

```text
皆様のあたたかなご支援が、舞台をさらに美しく彩ります。
お花に代わるデジタルギフトで、ダンサーたちへエールをお送りください。
```

Mock disclaimer:

```text
※これはモック機能です。実際の決済処理は行われません。
```

Options:

```text
ルビーの祝福 / 1,000円 / あたたかな応援の気持ちを贈ります
サファイアの祈り / 3,000円 / 舞台の成功を願う深い祈りを贈ります
魔法のバラ / 5,000円 / 最高級の賛辞と永遠の魔法を贈ります
```

### Behind The Scenes

Heading:

```text
舞台裏の記録
```

Body:

```text
本番へ向かう日々の記録を、少しずつお届けします。
稽古場に積み重なる時間も、この舞台を形づくる大切な物語です。
```

Timeline:

```text
2026.04.15 / 第一回 通しリハーサル完了
全体の流れと立ち位置の確認を行いました。課題も見え、これからの練習メニューが固まりました。

2026.06.01 / メインキャスト衣装到着
オーロラ姫とリラの精の衣装がアトリエから届きました。細部まで美しい刺繍が施されています。

2026.07.20 / 照明合わせ・ゲネプロ
本番同様の照明演出を加えた通し稽古を行います。
```

### Footer

```text
AYAMI BALLET STUDIO 第4回発表会
「眠れる森の美女」
2026年8月23日（日）14:30 開場 / 15:00 開演
穂の国とよはし芸術劇場 PLAT 主ホール

リンク:
穂の国とよはし芸術劇場 PLAT
AYAMI BALLET STUDIO 公式サイト
Instagram

お問い合わせ:
公演に関するお問い合わせはスタジオまでご連絡ください。
```

## Interaction Requirements

- Primary CTA opens the ticket modal or ticket flow.
- Secondary CTA scrolls to `#event-info`.
- Venue link opens the official venue site in a new tab.
- Calendar CTA, if present, should use existing `/api/calendar` or generated calendar URLs.
- Message submit must use `/api/messages`; never write privileged moderation behavior directly from the client.
- Preview/sample mode must be visibly labeled.
- Mock payment must remain visibly labeled as mock unless real payment is implemented.

## Visual Direction

- Palette: deep royal blue, near-black navy, warm gold, cream white, restrained rose/pink accents.
- Typography: Japanese serif for theatrical headings, readable sans-serif for operational body text.
- Layout: cinematic first viewport, then clear information sections.
- Motion: slow fade, gentle parallax, floating light particles. Avoid fast, busy, or playful movement.
- Cards: use sparingly. Avoid nested cards and excessive glass panels.
- Images: use real project assets. Do not leave visible `[ Image Placeholder ]` blocks in production-facing paths.

## Accessibility And Quality Notes

- Hero must have a real accessible `h1`, even when the visual title is inside an image.
- All CTA text must have strong contrast.
- Tap targets on mobile should be comfortable.
- Do not rely only on flip cards to reveal essential information. Provide accessible labels or make the content reachable without hover.
- Ensure modals trap focus and can be closed.
- Respect reduced-motion preferences where practical.

## Acceptance Criteria For Implementation

- Public home page communicates title, date, venue, ticket action, story tone, cast, and message action within one scroll path.
- Event information is visible before cast/messages.
- The page works on desktop and mobile without overlapping text or clipped CTAs.
- No production-facing placeholder image boxes remain.
- Mock-only flows are clearly marked.
- Existing tests, lint, and build pass.

## Verification Plan

- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop visual check of the full home page.
- Mobile visual check of hero, event info, cast cards, message form, and footer.
- Manual CTA check:
  - ticket modal opens/closes
  - event info anchor scroll works
  - venue/studio/Instagram links open correctly
  - message form validates and handles success/error states
  - mock gift disclaimer is visible if that section remains
