// src/utils/dateUtils.ts
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';

// Uncomment these if you need time zone or UTC support:
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

// Extend Day.js with whichever plugins are needed
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

/**
 * A type representing all valid date inputs for Day.js.
 */
export type DateInput = string | number | Date | Dayjs;

/**
 * Common date/time formats for convenience.
 * Use these or pass your own custom string.
 */
export const DATE_FORMATS = {
    // Common date formats:
    DD_MM_YYYY: 'DD-MM-YYYY', // e.g. 25-01-2025
    YYYY_MM_DD: 'YYYY-MM-DD', // e.g. 2025-01-25
    MM_DD_YYYY: 'MM-DD-YYYY', // e.g. 01-25-2025

    // Common time formats:
    HH_MM_SS: 'HH:mm:ss', // e.g. 13:45:30
    HH_MM: 'HH:mm', // e.g. 13:45

    // Common date-time formats:
    DD_MM_YYYY_HH_MM_SS: 'DD-MM-YYYY HH:mm:ss', // e.g. 25-01-2025 13:45:30
    YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH:mm:ss', // e.g. 2025-01-25 13:45:30
};

/**
 * Returns the current date/time as a Dayjs object.
 */
export function getCurrentDate(): Dayjs {
    return dayjs();
}

/**
 * Format a date (string, number, Date, or Dayjs) into a desired string format.
 *
 * @param date - The date or date string to format.
 * @param formatString - The desired format (default = 'DD-MM-YYYY').
 * @returns Formatted date string or empty string if invalid.
 */
export function formatDate(
    date: DateInput | undefined,
    formatString: string = DATE_FORMATS.DD_MM_YYYY,
): string {
    if (!date) return '';
    const d = dayjs(date);
    return d.isValid() ? d.format(formatString) : '';
}

/**
 * Format just the time portion of a date.
 *
 * @param date - The date/time to format.
 * @param formatString - The desired time format (default = 'HH:mm:ss').
 * @returns Formatted time string or empty string if invalid.
 */
export function formatTime(
    date: DateInput | undefined,
    formatString: string = DATE_FORMATS.HH_MM_SS,
): string {
    if (!date) return '';
    const d = dayjs(date);
    return d.isValid() ? d.format(formatString) : '';
}

/**
 * Format both date and time.
 *
 * @param date - The date/time to format.
 * @param formatString - The desired format for date and time
 *                      (default = 'DD-MM-YYYY HH:mm:ss').
 * @returns Formatted date-time string or empty string if invalid.
 */
export function formatDateTime(
    date: DateInput | undefined,
    formatString: string = DATE_FORMATS.DD_MM_YYYY_HH_MM_SS,
): string {
    if (!date) return '';
    const d = dayjs(date);
    return d.isValid() ? d.format(formatString) : '';
}

/**
 * Parse a date string into a Day.js object using a specific format.
 *
 * @param dateString - The date string to parse.
 * @param formatString - The format in which `dateString` is provided
 *                       (default = 'YYYY-MM-DD').
 * @returns A Dayjs object (which could be invalid if parsing fails).
 */
export function parseDate(
    dateString: string,
    formatString: string = DATE_FORMATS.YYYY_MM_DD,
): Dayjs {
    return dayjs(dateString, formatString);
}

/**
 * Convert a date (string, number, Date, or Dayjs) to an ISO 8601 string
 * (e.g. "2025-01-25T12:34:56Z"). This is typically what you’d send to your Go backend.
 *
 * @param date - The date to convert.
 * @returns ISO 8601 string, or empty string if invalid.
 */
export function toISOString(date: DateInput): string {
    const d = dayjs(date);
    return d.isValid() ? d.toISOString() : '';
}

/**
 * Get the "time ago" style string (e.g. "2 hours ago", "a month ago").
 *
 * @param date - Date to compare with current time.
 * @returns Human-readable relative time (e.g. "2 hours ago").
 */
export function timeFromNow(date: DateInput): string {
    const d = dayjs(date);
    return d.isValid() ? d.fromNow() : '';
}

/**
 * The object returned by compareDates, indicating relative positions of two dates.
 */
export interface CompareDatesResult {
    isSame: boolean;
    isBefore: boolean;
    isAfter: boolean;
}

/**
 * Compare two dates to see if they are the same, before, or after each other.
 * Comparison granularity is at the 'day' level by default.
 *
 * @param dateA - First date.
 * @param dateB - Second date.
 * @returns An object with booleans: isSame, isBefore, isAfter.
 */
export function compareDates(
    dateA: DateInput,
    dateB: DateInput,
): CompareDatesResult {
    const dA = dayjs(dateA);
    const dB = dayjs(dateB);

    return {
        isSame: dA.isSame(dB, 'day'),
        isBefore: dA.isBefore(dB, 'day'),
        isAfter: dA.isAfter(dB, 'day'),
    };
}

/**
 * Check if a date is between two other dates (inclusive by default).
 *
 * @param target - The date to check.
 * @param start - Start boundary.
 * @param end - End boundary.
 * @param unit - 'day', 'month', 'year', etc. (default 'day').
 * @param inclusivity - Default '[]' (inclusive of start & end).
 * @returns Whether the target is between `start` and `end`.
 */
export function isDateBetween(
    target: DateInput,
    start: DateInput,
    end: DateInput,
    unit: dayjs.OpUnitType = 'day',
    inclusivity: '[]' | '()' | '[)' | '(]' = '[]',
): boolean {
    const t = dayjs(target);
    const s = dayjs(start);
    const e = dayjs(end);

    if (!t.isValid() || !s.isValid() || !e.isValid()) {
        return false;
    }

    return t.isBetween(s, e, unit, inclusivity);
}
