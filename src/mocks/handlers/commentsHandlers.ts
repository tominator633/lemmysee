import { http, HttpResponse } from "msw";

export const commentsHandlers = [
  http.get(/\/api\/v3\/comment\/list/, ({ request }) => {
    const url = new URL(request.url);
    const postId = url.searchParams.get("post_id");

    // ❌ error scénář
    if (postId === "error") {
      return new HttpResponse(null, { status: 500 });
    }

    // 🟡 empty scénář
    if (postId === "empty") {
      return HttpResponse.json({ comments: [] });
    }

    // ✅ success scénář (nested comments)
    return HttpResponse.json({
      comments: [
        // root comment
        {
          comment: {
            id: 1,
            content: "Root comment",
            path: "0.1",
            published: "2024-01-01T00:00:00.000Z",
            post_id: 123,
          },
          creator: {
            id: 10,
            name: "user1",
          },
          counts: {
            score: 5,
          },
        },

        // child of 1
        {
          comment: {
            id: 2,
            content: "Child comment",
            path: "0.1.2",
            published: "2024-01-01T01:00:00.000Z",
            post_id: 123,
          },
          creator: {
            id: 11,
            name: "user2",
          },
          counts: {
            score: 3,
          },
        },

        // child of 2
        {
          comment: {
            id: 3,
            content: "Nested reply",
            path: "0.1.2.3",
            published: "2024-01-01T02:00:00.000Z",
            post_id: 123,
          },
          creator: {
            id: 12,
            name: "user3",
          },
          counts: {
            score: 1,
          },
        },

        // druhý root
        {
          comment: {
            id: 4,
            content: "Another root comment",
            path: "0.4",
            published: "2024-01-01T03:00:00.000Z",
            post_id: 123,
          },
          creator: {
            id: 13,
            name: "user4",
          },
          counts: {
            score: 10,
          },
        },
      ],
    });
  }),
];