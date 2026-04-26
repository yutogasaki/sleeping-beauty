export const EVENT_DETAILS = {
  productionTitle: "眠れる森の美女",
  studioTitle: "AYAMI BALLET STUDIO 第4回発表会",
  fullTitle: "AYAMI BALLET STUDIO 第4回発表会「眠れる森の美女」",
  venueName: "穂の国とよはし芸術劇場 PLAT 主ホール",
  venueLinkLabel: "Googleマップで会場を見る",
  accessUrl: "https://www.google.com/maps/search/?api=1&query=穂の国とよはし芸術劇場%20PLAT%20主ホール",
  studioUrl: "https://ayami-ballet.com/",
  instagramUrl: "https://www.instagram.com/ayami.ballet.studio/",
  ticketSalesUrl: "" as string,
  ticketSalesNotice: "チケットは7月販売開始予定",
  seatLabel: "全席自由",
  dateLabel: "2026年8月23日 (日)",
  footerDateLabel: "2026年8月23日（日）",
  ticketDateLabel: "2026.08.23",
  doorsOpenLabel: "14:30",
  startLabel: "15:00",
  endLabel: "17:00",
  doorsAndShowLabel: "14:30 開場 / 15:00 開演 / 17:00 終演（予定）",
  countdownTargetMs: new Date("2026-08-23T15:00:00+09:00").getTime(),
  calendarStartIso: "2026-08-23T15:00:00+09:00",
  calendarEndIso: "2026-08-23T17:00:00+09:00",
  calendarTimeZone: "Asia/Tokyo",
  calendarStartLabel: "20260823T150000",
  calendarEndLabel: "20260823T170000",
  calendarFilename: "sleeping-beauty-2026.ics",
  calendarDescription:
    "AYAMI BALLET STUDIO 第4回発表会『眠れる森の美女』。開場 14:30、開演 15:00。会場は穂の国とよはし芸術劇場 PLAT 主ホールです。",
  passCode: "SB-20260823",
} as const;

export function getGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_DETAILS.fullTitle,
    dates: `${EVENT_DETAILS.calendarStartLabel}/${EVENT_DETAILS.calendarEndLabel}`,
    location: EVENT_DETAILS.venueName,
    details: EVENT_DETAILS.calendarDescription,
    ctz: EVENT_DETAILS.calendarTimeZone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
