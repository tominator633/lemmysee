/* --- Základní stavební bloky (Shared) --- */

export interface ApiCommunity {
  id: number;
  name: string;
  title: string;
  description?: string;
  removed: boolean;
  published: string;
  updated?: string | null;
  deleted: boolean;
  nsfw: boolean;
  actor_id: string;
  local: boolean;
  icon?: string;
  banner?: string;
  hidden: boolean;
  posting_restricted_to_mods: boolean;
  instance_id: number;
  visibility?: "Public" | "DotEduOnly" | "Private"; 
}

export interface ApiCommunityAggregates {
  community_id: number;
  subscribers: number;
  posts: number;
  comments: number;
  published: string;
  users_active_day: number;
  users_active_week: number;
  users_active_month: number;
  users_active_half_year: number;
  subscribers_local?: number;
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
  matrix_user_id?: string; 
  bot_account: boolean;
  instance_id: number;
  avatar?: string;         
}

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
export type ApiSubscriptionType = 
"Subscribed" | 
"NotSubscribed" | 
"Pending";






/* --- Response pro SEARCH --- */

export interface ApiCommunityView {
  community: ApiCommunity;
  subscribed: ApiSubscriptionType;
  blocked: boolean;
  counts: ApiCommunityAggregates;
}

export interface ApiSearchResponse {
  type_: "Communities";
  communities: ApiCommunityView[];
}





/* --- Response pro fetch 1 komunity (DETAIL) (původní CommunityResponse) --- */

export interface ApiCommunityResponse {
  community_view: ApiCommunityView;
  site?: Site;
  moderators?: ModeratorView[];
  discussion_languages?: number[];
}


export interface ModeratorView {
  community: ApiCommunity;
  moderator: Person;
}