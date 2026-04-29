/**
 * Main response object for a Community view
 */
export interface CommunityResponse {
  community_view: CommunityView;
  site: Site;
  moderators: ModeratorView[];
  discussion_languages: number[]; // Array of language IDs
}

/**
 * Detailed view of a community including metadata and user-specific state
 */
export interface CommunityView {
  community: Community;
  subscribed: SubscriptionType;
  blocked: boolean;
  counts: CommunityAggregates;
  banned_from_community: boolean;
}

export interface Community {
  id: number;
  name: string;
  title: string;
  description?: string; // Optional: community might not have a sidebar/desc
  removed: boolean;
  published: string; // ISO 8601
  updated?: string;  // Optional: might never have been edited
  deleted: boolean;
  nsfw: boolean;
  actor_id: string;
  local: boolean;
  icon?: string;     // Optional: communities often don't have icons
  banner?: string;
  hidden: boolean;
  posting_restricted_to_mods: boolean;
  instance_id: number;
  visibility: CommunityVisibility;
}

export interface CommunityAggregates {
  community_id: number;
  subscribers: number;
  posts: number;
  comments: number;
  published: string;
  users_active_day: number;
  users_active_week: number;
  users_active_month: number;
  users_active_half_year: number;
  subscribers_local: number;
}

/**
 * Site-wide configuration and metadata
 */
export interface Site {
  id: number;
  name: string;
  sidebar?: string;
  published: string;
  updated?: string;
  icon?: string;
  description?: string;
  actor_id: string;
  last_refreshed_at: string;
  inbox_url: string;
  public_key: string;
  instance_id: number;
}

/**
 * Represents a moderator relationship
 */
export interface ModeratorView {
  community: Community;
  moderator: Person;
}

export interface Person {
  id: number;
  name: string;
  banned: boolean;
  published: string;
  updated?: string;
  actor_id: string;
  local: boolean;
  deleted: boolean;
  matrix_user_id?: string; // Optional: many users don't link Matrix
  bot_account: boolean;
  instance_id: number;
  avatar?: string;         // Common in Lemmy, though not in your snippet
}


export type SubscriptionType = "Subscribed" | "NotSubscribed" | "Pending";

export type CommunityVisibility = "Public" | "DotEduOnly" | "Private";