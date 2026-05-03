import { describe, it, expect } from "vitest";
import { buildCommentTree } from "./buildCommentTree";
import { makeMockComment } from "../../../shared/testing/mocks/data/commentsMocks";

describe("buildCommentTree", () => {
  it("returns empty array for empty input", () => {
    expect(buildCommentTree([])).toEqual([]);
  });

  it("places root-level comments at the top", () => {
    const tree = buildCommentTree([
      makeMockComment("1", "0.1"),
      makeMockComment("2", "0.2"),
    ]);

    expect(tree).toHaveLength(2);
    expect(tree.map((c) => c.id)).toEqual(["1", "2"]);
  });

  it("nests a child under its parent", () => {
    const tree = buildCommentTree([
      makeMockComment("1", "0.1"),
      makeMockComment("2", "0.1.2"),
    ]);

    expect(tree).toHaveLength(1);
    expect(tree[0].replies[0].id).toBe("2");
  });

  it("nests multiple levels deep", () => {
    const tree = buildCommentTree([
      makeMockComment("1", "0.1"),
      makeMockComment("2", "0.1.2"),
      makeMockComment("3", "0.1.2.3"),
    ]);

    expect(tree).toHaveLength(1);
    expect(tree[0].replies[0].replies[0].id).toBe("3");
  });

  it("handles multiple roots each with their own children", () => {
    const tree = buildCommentTree([
      makeMockComment("1", "0.1"),
      makeMockComment("2", "0.1.2"),
      makeMockComment("3", "0.3"),
      makeMockComment("4", "0.3.4"),
    ]);

    expect(tree).toHaveLength(2);
    expect(tree[0].replies[0].id).toBe("2");
    expect(tree[1].replies[0].id).toBe("4");
  });

  it("falls back to root when parent path is missing", () => {
    const tree = buildCommentTree([
      makeMockComment("1", "0.1"),
      makeMockComment("3", "0.1.2.3"),
    ]);

    expect(tree).toHaveLength(2);
  });

  it("initializes replies as empty array for leaf comments", () => {
    const tree = buildCommentTree([makeMockComment("1", "0.1")]);

    expect(tree[0].replies).toEqual([]);
  });

  it("resets existing replies on each call", () => {
    const comment = makeMockComment("1", "0.1");
    comment.replies = [makeMockComment("stale", "0.1.99")];

    const tree = buildCommentTree([comment]);

    expect(tree[0].replies).toEqual([]);
  });
});