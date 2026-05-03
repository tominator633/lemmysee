import { describe, it, expect } from "vitest";
import { formatNumberWithSpaces } from "./formatting";

describe("formatNumberWithSpaces", () => {
  it("formats thousands", () => {
    expect(formatNumberWithSpaces(1000)).toBe("1 000");
  });

  it("formats millions", () => {
    expect(formatNumberWithSpaces(1000000)).toBe("1 000 000");
  });

  it("formats arbitrary number", () => {
    expect(formatNumberWithSpaces(123456789)).toBe("123 456 789");
  });

  it("returns same for small numbers", () => {
    expect(formatNumberWithSpaces(123)).toBe("123");
  });

  it("handles zero", () => {
    expect(formatNumberWithSpaces(0)).toBe("0");
  });

  it("handles negative numbers", () => {
    expect(formatNumberWithSpaces(-123456)).toBe("-123 456");
  });
});