import { http, HttpResponse } from "msw";
import type { ApiPostListResponse } from "../../../features/posts/api/postsApiTypes";



export const postsHandlers = [
  http.get(/\/api\/v3\/post\/list/, ({ request }) => {
    const url = new URL(request.url);
    const communityId = url.searchParams.get("community_id");

    // 1) error scénář
    if (communityId === "error") {
      return new HttpResponse(null, { status: 500 });
    }

    // 2) invalid / missing input
    if (communityId === null || communityId.trim() === "") {
      return new HttpResponse(null, { status: 400 });
    }

    // 3) empty scénář
    if (communityId === "empty") {
      const emptyResponse: ApiPostListResponse = {
        posts: [],
        next_page: undefined,
      };

      return HttpResponse.json(emptyResponse);
    }

    // 4) success scénář
    const response: ApiPostListResponse = {
      posts: [
        {
          post: {
            id: 1,
            name: "Hello world post",
            url: "https://example.com",
            body: "This is a mock post",
            creator_id: 10,
            community_id: 100,

            removed: false,
            locked: false,
            deleted: false,
            nsfw: false,

            published: "2024-01-01T00:00:00.000Z",

            ap_id: "https://lemmy.world/post/1",
            local: true,

            featured_community: false,
            featured_local: false,

            thumbnail_url: "https://example.com/thumb.jpg",
          },

          creator: {
            id: 10,
            name: "john_doe",
            display_name: "John Doe",
            avatar: "https://example.com/avatar.png",
            banner: "https://example.com/banner.png",
            bio: "Mock user",
            banned: false,
            deleted: false,
            local: true,
            bot_account: false,
            actor_id: "https://lemmy.world/u/john_doe",
            published: "2024-01-01T00:00:00.000Z",
            instance_id: 1,
          },

          community: {
            id: 100,
            name: "typescript",
            title: "TypeScript Community",
            description: "Mock community",
            icon: "https://example.com/icon.png",
            banner: "https://example.com/banner.png",
            removed: false,
            deleted: false,
            hidden: false,
            nsfw: false,
            local: true,
            posting_restricted_to_mods: false,
            published: "2024-01-01T00:00:00.000Z",
            actor_id: "https://lemmy.world/c/typescript",
            visibility: "Public",
          },

          creator_banned_from_community: false,
          banned_from_community: false,
          creator_is_moderator: false,
          creator_is_admin: false,

          counts: {
            post_id: 1,
            comments: 12,
            score: 100,
            upvotes: 120,
            downvotes: 20,
            published: "2024-01-01T00:00:00.000Z",
          },

          subscribed: "Subscribed",
          saved: false,
          read: false,
          hidden: false,
          creator_blocked: false,
          unread_comments: 2,
        },
      ],
      next_page: "cursor_123",
    };

    return HttpResponse.json(response);
  }),
];