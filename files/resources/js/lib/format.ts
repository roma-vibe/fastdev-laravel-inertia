// Dates follow the page language (<html lang>, from APP_LOCALE) and the user's time zone.
const dateTimeFormat = new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
});

/** Formats an ISO 8601 timestamp for display. */
export function formatDateTime(iso: string): string {
    return dateTimeFormat.format(new Date(iso));
}
