
export interface ApiPostListResponse {
  posts: ApiPostItem[];
  next_page?: string;
}
export interface ApiPostItem {
  post: LemmyPost;
  creator: LemmyPerson;
  community: LemmyCommunity;
  image_details?: LemmyImageDetails;
  creator_banned_from_community: boolean;
  banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  counts: LemmyPostAggregates;
  subscribed: string;
  saved: boolean;
  read: boolean;
  hidden: boolean;
  creator_blocked: boolean;
  unread_comments: number;
}


export interface LemmyPost {
  id: number;
  name: string;
  url?: string;
  body?: string;
  creator_id: number;
  community_id: number;

  removed: boolean;
  locked: boolean;
  deleted: boolean;
  nsfw: boolean;

  published: string;         // ISO date
  updated?: string;          // ISO date

  ap_id: string;
  local: boolean;

  language_id?: number;
  featured_community: boolean;
  featured_local: boolean;

  thumbnail_url?: string;
  embed_title?: string;
  embed_description?: string;
  embed_video_url?: string;

  url_content_type?: string; // e.g. "image/jpeg"
}
export interface LemmyPerson {
  id: number;
  name: string;
  display_name?: string;

  avatar?: string;
  banner?: string;
  bio?: string;

  banned: boolean;
  deleted: boolean;
  local: boolean;
  bot_account: boolean;

  actor_id: string;
  published: string; // ISO date

  instance_id?: number;
}

export interface LemmyCommunity {
  id: number;
  name: string;
  title: string;
  description?: string;

  icon?: string;
  banner?: string;

  removed: boolean;
  deleted: boolean;
  hidden: boolean;
  nsfw: boolean;

  local: boolean;
  posting_restricted_to_mods: boolean;

  published: string;
  updated?: string;

  actor_id: string;
  instance_id?: number;

  visibility: string; // "Public", "LocalOnly", etc.
}

export interface LemmyPostAggregates {
  post_id: number;

  comments: number;
  score: number;
  upvotes: number;
  downvotes: number;

  published: string;
  newest_comment_time?: string;
}

export interface LemmyImageDetails {
  link: string;
  width: number;
  height: number;
  content_type: string;
}




