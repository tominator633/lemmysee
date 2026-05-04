import { describe, it, expect } from "vitest";
import { mapApiCommentViewToCommentDomain } from "./commentsMapper";
import { mockApiCommentView } from "../../../shared/testing/mocks/data/commentsMocks";

describe("mapApiCommentViewToCommentDomain", () => {
  it("maps id as string", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.id).toBe("1");
  });

  it("maps author name", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.author).toBe("user1");
  });

  it("maps authorId as string", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.authorId).toBe("10");
  });

  it("maps content", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.content).toBe("Root comment");
  });

  it("maps timePublished", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.timePublished).toBe("2024-01-01T00:00:00.000Z");
  });

  it("maps score", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.score).toBe(5);
  });

  it("maps path", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.path).toBe("0.1");
  });

  it("maps postId as string", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.postId).toBe("123");
  });

  it("initializes replies as empty array", () => {
    const result = mapApiCommentViewToCommentDomain(mockApiCommentView);

    expect(result.replies).toEqual([]);
  });
});