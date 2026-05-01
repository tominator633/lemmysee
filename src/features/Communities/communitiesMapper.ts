import type { ApiCommunityView } from "./communitiesApiTypes";
import { type Community } from "./communitiesTypes";

export const mapApiCommunityViewToCommunityDomain = (apiCommunityView: ApiCommunityView): Community => {
    return {
        name: apiCommunityView.community.name,
        id: String(apiCommunityView.community.id),
        headerTitle: apiCommunityView.community.title,
        iconImg: apiCommunityView.community.icon ?? null,
        bannerImg: apiCommunityView.community.banner ?? null,
        description: apiCommunityView.community.description ?? null,
        isHidden: apiCommunityView.community.hidden,
        isBlocked: apiCommunityView.blocked,
        timePublished: apiCommunityView.community.published,
        counts: {
            posts: apiCommunityView.counts.posts,
            comments: apiCommunityView.counts.comments,
            subscribers: apiCommunityView.counts.subscribers,
            usersActivePerWeek: apiCommunityView.counts.users_active_week,
            usersActivePerMonth: apiCommunityView.counts.users_active_month
        },
    };
};