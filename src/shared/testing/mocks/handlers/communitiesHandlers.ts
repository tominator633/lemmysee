import { http, HttpResponse } from "msw";

export const communitiesHandlers = [
  http.get(/\/api\/v3\/search/, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    // invalid input
    if (query === null || query.trim() === "") {
      return new HttpResponse(null, { status: 400 });
    }

    // error scenario
    if (query === "error") {
      return new HttpResponse(null, { status: 500 });
    }

    // empty scenario
    if (query === "empty") {
      return HttpResponse.json({ communities: [] });
    }

    // success scenario
    return HttpResponse.json({
      communities: [
        {
          community: {
            id: 1,
            name: "react",
            title: "React Community",
            icon: undefined,
            banner: undefined,
            description: "All about React",
            hidden: false,
            published: "2024-01-01T00:00:00.000Z",
          },
          blocked: false,
          counts: {
            posts: 100,
            comments: 500,
            subscribers: 1000,
            users_active_week: 200,
            users_active_month: 400,
          },
        },
      ],
    });
  }),








  //ONE COMMUNITY HANDLER
  http.get(/\/api\/v3\/community/, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id === null || id.trim() === "") {
      return new HttpResponse(null, { status: 400 });
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return new HttpResponse(null, { status: 400 });
    }
    if (numericId === 0) {
      return new HttpResponse(null, { status: 404 });
    }

    // 4) success response
    return HttpResponse.json({
      community_view: {
        community: {
          id: numericId,
          name: "react",
          title: "React Community",
          description: "Mock community",
          removed: false,
          published: "2024-01-01T00:00:00.000Z",
          updated: null,
          deleted: false,
          nsfw: false,
          actor_id: `https://lemmy.world/c/${numericId}`,
          local: true,
          icon: "https://example.com/icon.png",
          banner: "https://example.com/banner.png",
          hidden: false,
          posting_restricted_to_mods: false,
          instance_id: 1,
          visibility: "Public",
        },

        subscribed: "Subscribed",
        blocked: false,

        counts: {
          community_id: numericId,
          subscribers: 1000,
          posts: 100,
          comments: 500,
          published: "2024-01-01T00:00:00.000Z",
          users_active_day: 10,
          users_active_week: 50,
          users_active_month: 200,
          users_active_half_year: 800,
        },
      },
    });
  }),
];








