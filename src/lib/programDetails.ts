export type ProgramChapter = {
  id: string;
  chapterLabel: string;
  title: string;
  summary: string;
  finale?: {
    title: string;
    performers: string;
  };
  principalCast?: {
    role: string;
    performer: string;
  }[];
  featured?: boolean;
};

export const PROGRAM_CHAPTERS: ProgramChapter[] = [
  {
    id: "chapter-1",
    chapterLabel: "Chapter 1",
    title: "バレエ作品",
    summary: "クラシック・バレエの華やかな幕開け",
    finale: {
      title: "『ドン・キホーテ』第3幕 グラン・パ・ド・ドゥ",
      performers: "伊藤 あゆみ　長谷川 元志（神澤千景バレエスタジオ）",
    },
  },
  {
    id: "chapter-2",
    chapterLabel: "Chapter 2",
    title: "創作作品",
    summary: "多彩な世界が広がる創作作品集",
    finale: {
      title: "『サタネラ』より グラン・パ・ド・ドゥ ほか",
      performers: "村田 紗空　南野 高廣（松岡伶子バレエ団）",
    },
  },
  {
    id: "chapter-3",
    chapterLabel: "Chapter 3",
    title: "眠れる森の美女",
    summary: "オーロラ姫の物語を描くメイン演目",
    principalCast: [
      { role: "オーロラ姫", performer: "成田 寧音" },
      { role: "デジレ王子", performer: "長谷川 元志" },
      { role: "リラの精（善の精）", performer: "甲斐 愛" },
      { role: "カラボス（悪の精）", performer: "伊藤 あゆみ" },
      { role: "メリーウェザー（守護の精）", performer: "富田 理央" },
      { role: "フォーナ（守護の精）", performer: "荻原 里音菜" },
      { role: "フローラ（守護の精）", performer: "柴田 ここな" },
      { role: "フロリナ姫", performer: "藤原 彩愛" },
      { role: "青い鳥", performer: "南野 高廣" },
    ],
    featured: true,
  },
];

export const PROGRAM_NOTE = "※出演者・演目は変更となる場合がございます。";
