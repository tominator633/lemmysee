




export interface PostItem {
  post: {
    id: number;
    name: string;
    url: string;
    creator_id: number;
    community_id: number;
    removed: boolean;
    locked: boolean;
    published: string; // ISO 8601 timestamp
    deleted: boolean;
    nsfw: boolean;
    thumbnail_url?: string;
    ap_id: string;
    local: boolean;
    language_id: number;
    featured_community: boolean;
    featured_local: boolean;
    url_content_type?: string;
  };
  creator: {
    id: number;
    name: string;
    display_name?: string;
    avatar?: string;
    banned: boolean;
    published: string;
    actor_id: string;
    bio?: string;
    local: boolean;
    banner?: string;
    deleted: boolean;
    bot_account: boolean;
    instance_id: number;
  };
  community: {
    id: number;
    name: string;
    title: string;
    description: string;
    removed: boolean;
    published: string;
    updated: string;
    deleted: boolean;
    nsfw: boolean;
    actor_id: string;
    local: boolean;
    icon?: string;
    hidden: boolean;
    posting_restricted_to_mods: boolean;
    instance_id: number;
    visibility: string;
  };
  image_details?: {
    link: string;
    width: number;
    height: number;
    content_type: string;
  };
  creator_banned_from_community: boolean;
  banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  counts: {
    post_id: number;
    comments: number;
    score: number;
    upvotes: number;
    downvotes: number;
    published: string;
    newest_comment_time?: string;
  };
  subscribed: string; // např. "NotSubscribed"
  saved: boolean;
  read: boolean;
  hidden: boolean;
  creator_blocked: boolean;
  unread_comments: number;
}

export interface PostListResponse {
  posts: PostItem[];
  next_page?: string;
}

