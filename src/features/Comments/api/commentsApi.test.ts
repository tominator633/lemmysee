import { describe, it, expect } from "vitest";
import { buildCommentTree } from "../lib/buildCommentTree";
import type { Comment } from "../model/commentsTypes";

// ── helpers ───────────────────────────────────────────────────────────────────

function makeComment(id: string, path: string): Comment {
  return {
    id,
    path,
    replies: [],
    author: null,
    authorId: "",
    content: "",
    timePublished: "",
    score: null,
    postId: "",
  };
}

// ── tests ─────────────────────────────────────────────────────────────────────

describe("buildCommentTree", () => {
  it("returns empty array for empty input", () => {
    expect(buildCommentTree([])).toEqual([]);
  });

  it("places root-level comments at the top", () => {
    const comments = [makeComment("1", "0.1"), makeComment("2", "0.2")];
    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree.map((c) => c.id)).toEqual(["1", "2"]);
  });

  it("nests a child under its parent", () => {
    const comments = [makeComment("1", "0.1"), makeComment("2", "0.1.2")];
    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0].replies).toHaveLength(1);
    expect(tree[0].replies[0].id).toBe("2");
  });

  it("nests multiple levels deep", () => {
    const comments = [
      makeComment("1", "0.1"),
      makeComment("2", "0.1.2"),
      makeComment("3", "0.1.2.3"),
    ];
    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0].replies[0].replies[0].id).toBe("3");
  });

  it("handles multiple roots each with their own children", () => {
    const comments = [
      makeComment("1", "0.1"),
      makeComment("2", "0.1.2"),
      makeComment("3", "0.3"),
      makeComment("4", "0.3.4"),
    ];
    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree[0].replies[0].id).toBe("2");
    expect(tree[1].replies[0].id).toBe("4");
  });

  it("falls back to root when parent path is missing", () => {
    // comment "3" references parent "0.1.2" which doesn't exist
    const comments = [makeComment("1", "0.1"), makeComment("3", "0.1.2.3")];
    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
  });

  it("initializes replies as empty array for leaf comments", () => {
    const comments = [makeComment("1", "0.1")];
    const tree = buildCommentTree(comments);

    expect(tree[0].replies).toEqual([]);
  });
});