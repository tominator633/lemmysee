import { type PostType } from "../../../../features/posts/model/postsTypes";


export const mockPost: PostType = {
  id: "123",
  creator: "john_doe",
  creatorId: "10",
  creatorAvatar: null,
  creatorBanner: null,
  creatorBio: null,
  timePublished: "2024-05-31T22:00:00.000Z",
  community: "typescript",
  title: "Test post title",
  text: null,
  postUrl: "https://lemmy.world/post/123",
  imgUrl: null,
  score: 42,
  upvotes: 50,
  downvotes: 8,
  videoUrl: null,
  externalUrl: null,
};