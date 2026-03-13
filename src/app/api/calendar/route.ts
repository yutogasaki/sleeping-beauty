import { NextResponse } from "next/server";

import { escapeIcsText, EVENT_DETAILS } from "@/lib/eventDetails";

export const dynamic = "force-static";

function buildCalendarFile() {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AYAMI BALLET STUDIO//Sleeping Beauty//JA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${EVENT_DETAILS.passCode.toLowerCase()}@sleeping-beauty`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${EVENT_DETAILS.calendarTimeZone}:${EVENT_DETAILS.calendarStartLabel}`,
    `DTEND;TZID=${EVENT_DETAILS.calendarTimeZone}:${EVENT_DETAILS.calendarEndLabel}`,
    `SUMMARY:${escapeIcsText(EVENT_DETAILS.fullTitle)}`,
    `DESCRIPTION:${escapeIcsText(EVENT_DETAILS.calendarDescription)}`,
    `LOCATION:${escapeIcsText(EVENT_DETAILS.venueName)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.join("\r\n")}\r\n`;
}

export function GET() {
  return new NextResponse(buildCalendarFile(), {
    headers: {
      "Content-Disposition": `attachment; filename="${EVENT_DETAILS.calendarFilename}"`,
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
