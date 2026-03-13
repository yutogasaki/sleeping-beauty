import { EVENT_DETAILS } from "@/lib/eventDetails";

import { GET } from "./route";

describe("GET /api/calendar", () => {
  it("returns an ICS file response with stable event metadata", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/calendar; charset=utf-8");
    expect(response.headers.get("cache-control")).toBe("public, max-age=3600");
    expect(response.headers.get("content-disposition")).toContain(
      EVENT_DETAILS.calendarFilename,
    );

    expect(body).toContain("BEGIN:VCALENDAR");
    expect(body).toContain("BEGIN:VEVENT");
    expect(body).toContain(`SUMMARY:${EVENT_DETAILS.fullTitle}`);
    expect(body).toContain(`LOCATION:${EVENT_DETAILS.venueName.replace(/,/g, "\\,")}`);
    expect(body).toContain(
      `DTSTART;TZID=${EVENT_DETAILS.calendarTimeZone}:${EVENT_DETAILS.calendarStartLabel}`,
    );
    expect(body).toContain(
      `DTEND;TZID=${EVENT_DETAILS.calendarTimeZone}:${EVENT_DETAILS.calendarEndLabel}`,
    );
    expect(body).toContain("END:VCALENDAR");
  });
});
