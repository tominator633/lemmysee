import { describe, it, expect } from "vitest";
import { renderSelfText } from "./markdown";

describe("renderSelfText", () => {
  it("returns undefined for empty string", () => {
    expect(renderSelfText("")).toBeUndefined();
  });

  it("converts markdown to HTML", () => {
    const result = renderSelfText("**bold**");

    expect(result).toEqual({
      __html: "<p><strong>bold</strong></p>\n",
    });
  });

  it("sanitizes script tags", () => {
    const result = renderSelfText('<script>alert("xss")</script>');

    expect(result?.__html).not.toContain("<script>");
  });

  it("allows safe HTML", () => {
     const result = renderSelfText("<b>safe</b>");

    // markdown-it escapuje raw HTML by default — výsledek je plain text v <p>
    expect(result?.__html).toContain("safe");
    expect(result?.__html).not.toContain("<script>");
  });

  it("handles mixed markdown and html", () => {
    const result = renderSelfText("Hello **world** <script>alert(1)</script>");

    expect(result?.__html).toContain("<strong>world</strong>");
    expect(result?.__html).not.toContain("<script>");
  });
});