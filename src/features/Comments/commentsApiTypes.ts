//enums
export type SubscriptionStatus =
  | "Subscribed"
  | "NotSubscribed"
  | "Pending";




export interface ApiCommentListResponse {
  comments: ApiCommentView[];
}
export interface ApiCommentView {
  comment: ApiComment;
  creator: ApiPerson;
  post: ApiPost;
  community: ApiCommunity;
  counts: ApiCommentCounts;

  creator_banned_from_community: boolean;
  banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;

  subscribed: SubscriptionStatus;
  saved: boolean;
  creator_blocked: boolean;
}
export interface ApiComment {
  id: number;
  creator_id: number;
  post_id: number;

  content: string;

  removed: boolean;
  deleted: boolean;

  published: string; // ISO date
  ap_id: string;

  local: boolean;
  path: string;

  distinguished: boolean;
  language_id: number;
}

export interface ApiPerson {
  id: number;
  name: string;

  display_name?: string;
  avatar?: string;
  bio?: string;

  banned: boolean;
  published: string;

  actor_id: string;
  local: boolean;
  deleted: boolean;
  bot_account: boolean;

  instance_id: number;
}

export interface ApiPost {
  id: number;
  name: string;

  url?: string;
  thumbnail_url?: string;

  creator_id: number;
  community_id: number;

  removed: boolean;
  locked: boolean;
  deleted: boolean;
  nsfw: boolean;

  published: string;

  ap_id: string;
  local: boolean;

  language_id: number;

  featured_community: boolean;
  featured_local: boolean;

  url_content_type?: string;
}


export interface ApiCommunity {
  id: number;
  name: string;
  title: string;

  description?: string;

  removed: boolean;
  published: string;
  updated?: string;

  deleted: boolean;
  nsfw: boolean;

  actor_id: string;
  local: boolean;

  icon?: string;
  banner?: string;

  hidden: boolean;
  posting_restricted_to_mods: boolean;

  instance_id: number;
  visibility: "Public" | "Private" | string;
}


export interface ApiCommentCounts {
  comment_id: number;

  score: number;
  upvotes: number;
  downvotes: number;

  published: string;

  child_count: number;
}