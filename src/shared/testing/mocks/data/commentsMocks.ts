import type { ApiCommentView } from "../../../../features/comments/api/commentsApiTypes";
import { type Comment } from "../../../../features/comments/model/commentsTypes";

export const mockApiCommentView: ApiCommentView = {
  comment: {
    id: 1,
    creator_id: 10,
    post_id: 123,
    content: "Root comment",
    removed: false,
    deleted: false,
    published: "2024-01-01T00:00:00.000Z",
    ap_id: "https://lemmy.world/comment/1",
    local: true,
    path: "0.1",
    distinguished: false,
    language_id: 0,
  },
  creator: {
    id: 10,
    name: "user1",
    banned: false,
    published: "2024-01-01T00:00:00.000Z",
    actor_id: "https://lemmy.world/u/user1",
    local: true,
    deleted: false,
    bot_account: false,
    instance_id: 1,
  },
  post: {
    id: 123,
    name: "Test post",
    creator_id: 10,
    community_id: 100,
    removed: false,
    locked: false,
    deleted: false,
    nsfw: false,
    published: "2024-01-01T00:00:00.000Z",
    ap_id: "https://lemmy.world/post/123",
    local: true,
    language_id: 0,
    featured_community: false,
    featured_local: false,
  },
  community: {
    id: 100,
    name: "typescript",
    title: "TypeScript Community",
    removed: false,
    published: "2024-01-01T00:00:00.000Z",
    deleted: false,
    nsfw: false,
    actor_id: "https://lemmy.world/c/typescript",
    local: true,
    hidden: false,
    posting_restricted_to_mods: false,
    instance_id: 1,
    visibility: "Public",
  },
  counts: {
    comment_id: 1,
    score: 5,
    upvotes: 6,
    downvotes: 1,
    published: "2024-01-01T00:00:00.000Z",
    child_count: 2,
  },
  creator_banned_from_community: false,
  banned_from_community: false,
  creator_is_moderator: false,
  creator_is_admin: false,
  subscribed: "NotSubscribed",
  saved: false,
  creator_blocked: false,
};

// handler používá minimální subset — zde jsou hotové objekty pro něj
export const mockHandlerComments = [
  {
    comment: { id: 1, content: "Root comment", path: "0.1", published: "2024-01-01T00:00:00.000Z", post_id: 123 },
    creator: { id: 10, name: "user1" },
    counts: { score: 5 },
  },
  {
    comment: { id: 2, content: "Child comment", path: "0.1.2", published: "2024-01-01T01:00:00.000Z", post_id: 123 },
    creator: { id: 11, name: "user2" },
    counts: { score: 3 },
  },
  {
    comment: { id: 3, content: "Nested reply", path: "0.1.2.3", published: "2024-01-01T02:00:00.000Z", post_id: 123 },
    creator: { id: 12, name: "user3" },
    counts: { score: 1 },
  },
  {
    comment: { id: 4, content: "Another root comment", path: "0.4", published: "2024-01-01T03:00:00.000Z", post_id: 123 },
    creator: { id: 13, name: "user4" },
    counts: { score: 10 },
  },
];





export function makeMockComment(id: string, path: string): Comment {
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

export function makeMockCommentWithContent(overrides?: Partial<Comment>): Comment {
  return {
    ...makeMockComment("1", "0.1"),
    author: "john_doe",
    authorId: "10",
    content: "Hello world",
    timePublished: "2024-05-31T22:00:00.000Z",
    score: 42,
    ...overrides,
  };
}

export function makeMockReply(id: string, path: string, content: string): Comment {
  return {
    ...makeMockComment(id, path),
    author: `user${id}`,
    authorId: id,
    content,
    timePublished: "2024-05-31T23:00:00.000Z",
    score: 1,
  };
}