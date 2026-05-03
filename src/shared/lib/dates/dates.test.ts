// isoToAgo.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isoToAgo } from "./dates";

describe("isoToAgo", () => {
  const FIXED_NOW = new Date("2024-01-01T00:00:00.000Z").getTime();

  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(FIXED_NOW);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws on invalid date", () => {
    expect(() => isoToAgo("invalid")).toThrow("Invalid ISO date string");
  });

  it("returns seconds ago", () => {
    const iso = new Date(FIXED_NOW - 10 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("10 s ago");
  });

  it("returns minutes ago", () => {
    const iso = new Date(FIXED_NOW - 2 * 60 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("2 mins ago");
  });

  it("returns singular minute", () => {
    const iso = new Date(FIXED_NOW - 60 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("1 min ago");
  });

  it("returns hours ago", () => {
    const iso = new Date(FIXED_NOW - 3 * 60 * 60 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("3 hours ago");
  });

  it("returns days ago", () => {
    const iso = new Date(FIXED_NOW - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("2 days ago");
  });

  it("returns months ago", () => {
    const iso = new Date(FIXED_NOW - 3 * 2629743 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("3 months ago");
  });

  it("returns years ago", () => {
    const iso = new Date(FIXED_NOW - 2 * 31556926 * 1000).toISOString();
    expect(isoToAgo(iso)).toBe("2 years ago");
  });
});