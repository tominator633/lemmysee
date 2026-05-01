// postsMapper.ts

import { type ApiPostItem } from "./postsApiTypes";
import { type PostType } from "./postsTypes";

export const mapApiPostItemToPost = (apiPostItem: ApiPostItem): PostType => {
  return {
    id: String(apiPostItem.post.id),
    creator: apiPostItem.creator.name,
    creatorId: String(apiPostItem.creator.id),
    creatorAvatar: apiPostItem.creator.avatar ?? null,
    creatorBanner: apiPostItem.creator.banner ?? null,
    creatorBio: apiPostItem.creator.bio ?? null,
    timePublished: apiPostItem.post.published,
    community: apiPostItem.community.name,
    title: apiPostItem.post.name,
    text: apiPostItem.post.body ?? null,
    postUrl: apiPostItem.post.ap_id,
    imgUrl:
      apiPostItem.image_details?.link ??
      apiPostItem.post.thumbnail_url ??
      null,
    score: apiPostItem.counts.score,
    upvotes: apiPostItem.counts.upvotes,
    downvotes: apiPostItem.counts.downvotes,
    videoUrl: apiPostItem.post.url_content_type?.startsWith("video/")
      ? apiPostItem.post.url
      : null,
    externalUrl: apiPostItem.post.url_content_type?.startsWith("text/html")
      ? apiPostItem.post.url
      : null,
  };
};