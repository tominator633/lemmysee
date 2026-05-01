




export interface ApiPersonResponse {
  person_view: PersonView;
  posts: Object[];
  comments: Object[];
  moderates: Object[];
}

/**
 * Základní informace o uživateli a jeho globální statistiky
 */
export interface PersonView {
  person: Person;
  counts: PersonAggregates;
}

export interface Person {
  id: number;
  name: string;
  display_name?: string; // Často bývá null, pokud není nastaveno
  avatar?: string;       // URL k obrázku
  banner?: string;       // URL k banneru profilu
  bio?: string;          // Markdown biografie
  banned: boolean;
  published: string;     // ISO Date
  updated?: string;      // ISO Date
  actor_id: string;      // ActivityPub identifikátor
  local: boolean;
  deleted: boolean;
  matrix_user_id?: string;
  bot_account: boolean;
  instance_id: number;
}

export interface PersonAggregates {
  id: number;
  person_id: number;
  post_count: number;
  post_score: number;
  comment_count: number;
  comment_score: number;
}

/**
 * Zobrazení příspěvků uživatele v rámci detailu
 */
/* export interface PostView {
  post: Post;
  creator: Person;
  community: Community;
  creator_banned_from_community: boolean;
  counts: PostAggregates;
  subscribed: SubscriptionType;
  saved: boolean;
  read: boolean;
  creator_blocked: boolean;
  my_vote?: number; // 1 (upvote), -1 (downvote), 0 nebo null (no vote)
} */

/**
 * Seznam komunit, které daný uživatel moderuje
 */
/* export interface CommunityModeratorView {
  community: Community;
  moderator: Person;
} */

// Re-use předchozích subtypů (Community, SubscriptionType atd.)