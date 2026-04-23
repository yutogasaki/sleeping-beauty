export type ProgramChapter = {
  id: string;
  chapterLabel: string;
  title: string;
  summary: string;
  featured?: boolean;
};

export const PROGRAM_CHAPTERS: ProgramChapter[] = [
  {
    id: "chapter-1",
    chapterLabel: "Chapter 1",
    title: "バレエ作品",
    summary: "クラシック・バレエの華やかな幕開け",
  },
  {
    id: "chapter-2",
    chapterLabel: "Chapter 2",
    title: "創作作品",
    summary: "多彩な世界が広がる創作作品集",
  },
  {
    id: "chapter-3",
    chapterLabel: "Chapter 3",
    title: "眠れる森の美女",
    summary: "オーロラ姫の物語を描くメイン演目",
    featured: true,
  },
];

export const PROGRAM_NOTE = "※出演者・演目は変更となる場合がございます。";
