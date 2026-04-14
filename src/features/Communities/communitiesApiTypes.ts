//ENUMS
export type SubscribedType =
  | "Subscribed"
  | "NotSubscribed"
  | "Pending";






export interface ApiSearchResponse {
  type_: "Communities";
  comments: unknown[];
  posts: unknown[];    
  communities: ApiCommunityView[];
  users: unknown[];   
}


export interface ApiCommunityView {
  community: LemmyApiCommunity;

  subscribed: SubscribedType;
  blocked: boolean;

  counts: CommunityAggregates;
}



export interface LemmyApiCommunity {
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
}


export interface CommunityAggregates {
  id?: number; // sometimes present, sometimes not
  community_id: number;

  subscribers: number;
  posts: number;
  comments: number;

  published: string;

  users_active_day: number;
  users_active_week: number;
  users_active_month: number;
  users_active_half_year: number;

  subscribers_local?: number; // not always present in v3
}