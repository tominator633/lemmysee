export interface Community {
  id: string;
  name: string;
  headerTitle: string;
  iconImg: string | null;
  bannerImg: string | null;
  description: string | null;
  isHidden: boolean;
  isBlocked: boolean;
  timePublished: string;
  counts: {
    posts: number;
    comments: number;
    subscribers: number;
    usersActivePerWeek: number;
    usersActivePerMonth: number;
    }
}

export interface CommunitiesState {
    swiperCommunities: Community[];
    currentCommunity: Community | Record<string, never>;
}
