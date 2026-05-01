import { http, HttpResponse } from 'msw';

export const communitiesHandlers = [

  http.get(/\/api\/v3\/search/, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (query === "empty") {
    return HttpResponse.json({ communities: [] });
  }

  if (query === "error") {
    return new HttpResponse(null, { status: 500 });
  }
    /* následující mock response musí odpovídat typu  ApiCommunityView
    potože na tu část lemmy api dat se v async thunku aplikuje map method*/
    return HttpResponse.json({
      communities: [
        {
          community: {
            id: 1,
            name: "react",
            title: "React Community",
            icon: null,
            banner: null,
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









];