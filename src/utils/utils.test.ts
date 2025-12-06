
import { epochToAgo, formatNumberWithSpaces } from './utils.js';




describe('epochToAgo', () => {

    /* USE ALWAYS beforeEach and afterEach instead of beforeAll afterAll...it was causing all tests to fail  */
    beforeEach(() => {
        // Mock the Date.now() function to return a fixed time (e.g., 1,615,000,000,000 ms)
        jest.spyOn(Date, 'now').mockImplementation(() => 1615000000000);
    });

    afterEach(() => {
        // Restore the original Date.now() implementation after tests
        jest.restoreAllMocks();
    });

    test("Date.now() returns the mock value", () => {
        expect(Date.now()).toBe(1615000000000);
    })

    test('returns correct output for 1 year ago', () => {
        const oneYearAgoEpoch = 1615000000 - 31556926;
        expect(epochToAgo(oneYearAgoEpoch)).toBe('1 year ago');
    });

    test('returns correct output for multiple years ago', () => {
        const twoYearsAgoEpoch = 1615000000 - 2 * 31556926;
        expect(epochToAgo(twoYearsAgoEpoch)).toBe('2 years ago');
    });

    test('returns correct output for 1 month ago', () => {
        const oneMonthAgoEpoch = 1615000000 - 2629743.83;
        expect(epochToAgo(oneMonthAgoEpoch)).toBe('1 month ago');
    });

    test('returns correct output for multiple months ago', () => {
        const threeMonthsAgoEpoch = 1615000000 - 3 * 2629743.83;
        expect(epochToAgo(threeMonthsAgoEpoch)).toBe('3 months ago');
    });

    test('returns correct output for 1 day ago', () => {
        const oneDayAgoEpoch = 1615000000 - 86400;
        expect(epochToAgo(oneDayAgoEpoch)).toBe('1 day ago');
    });

    test('returns correct output for multiple days ago', () => {
        const fiveDaysAgoEpoch = 1615000000 - 5 * 86400;
        expect(epochToAgo(fiveDaysAgoEpoch)).toBe('5 days ago');
    });

    test('returns correct output for 1 hour ago', () => {
        const oneHourAgoEpoch = 1615000000 - 3600;
        expect(epochToAgo(oneHourAgoEpoch)).toBe('1 hour ago');
    });

    test('returns correct output for multiple hours ago', () => {
        const fourHoursAgoEpoch = 1615000000 - 4 * 3600;
        expect(epochToAgo(fourHoursAgoEpoch)).toBe('4 hours ago');
    });

    test('returns correct output for 1 minute ago', () => {
        const oneMinuteAgoEpoch = 1615000000 - 60;
        expect(epochToAgo(oneMinuteAgoEpoch)).toBe('1 min ago');
    });

    test('returns correct output for multiple minutes ago', () => {
        const thirtyMinutesAgoEpoch = 1615000000 - 30 * 60;
        expect(epochToAgo(thirtyMinutesAgoEpoch)).toBe('30 mins ago');
    });

    test('returns correct output for seconds ago', () => {
        const fiveSecondsAgoEpoch = 1615000000 - 5;
        expect(epochToAgo(fiveSecondsAgoEpoch)).toBe('5 s ago');
    });
});


describe('formatNumberWithSpaces', () => {
    test('formats a number with thousands separator for 4 digits', () => {
        expect(formatNumberWithSpaces(1234)).toBe('1 234');
    });

    test('formats a number with thousands separators for 6 digits', () => {
        expect(formatNumberWithSpaces(123456)).toBe('123 456');
    });

    test('formats a number with thousands separators for 7 digits', () => {
        expect(formatNumberWithSpaces(1234567)).toBe('1 234 567');
    });

    test('formats a number with thousands separators for 10 digits', () => {
        expect(formatNumberWithSpaces(1234567890)).toBe('1 234 567 890');
    });

    test('returns the same number as a string if it has less than 4 digits', () => {
        expect(formatNumberWithSpaces(123)).toBe('123');
        expect(formatNumberWithSpaces(0)).toBe('0');
        expect(formatNumberWithSpaces(12)).toBe('12');
    });

    test('formats negative numbers correctly', () => {
        expect(formatNumberWithSpaces(-1234567)).toBe('-1 234 567');
    });

    test('formats decimal numbers correctly', () => {
        expect(formatNumberWithSpaces(1234.567)).toBe('1 234.567');
        expect(formatNumberWithSpaces(1234567.89)).toBe('1 234 567.89');
    });
    
    test('formats large numbers correctly', () => {
        expect(formatNumberWithSpaces(1000000000)).toBe('1 000 000 000');
    });
});