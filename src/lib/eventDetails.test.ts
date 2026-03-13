import { escapeIcsText, EVENT_DETAILS, getGoogleCalendarUrl } from "./eventDetails";

describe("eventDetails", () => {
  it("builds a Google Calendar link with stable event data", () => {
    const url = new URL(getGoogleCalendarUrl());

    expect(url.origin).toBe("https://calendar.google.com");
    expect(url.pathname).toBe("/calendar/render");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("text")).toBe(EVENT_DETAILS.fullTitle);
    expect(url.searchParams.get("location")).toBe(EVENT_DETAILS.venueName);
    expect(url.searchParams.get("ctz")).toBe(EVENT_DETAILS.calendarTimeZone);
    expect(url.searchParams.get("dates")).toBe(
      `${EVENT_DETAILS.calendarStartLabel}/${EVENT_DETAILS.calendarEndLabel}`,
    );
  });

  it("escapes ICS control characters", () => {
    expect(escapeIcsText("Line 1\nLine,2;Line\\3")).toBe("Line 1\\nLine\\,2\\;Line\\\\3");
  });

  it("keeps countdown and calendar metadata aligned", () => {
    expect(EVENT_DETAILS.countdownTargetMs).toBe(
      new Date(EVENT_DETAILS.calendarStartIso).getTime(),
    );
    expect(EVENT_DETAILS.startLabel).toBe("15:00");
    expect(EVENT_DETAILS.doorsOpenLabel).toBe("14:30");
  });
});
