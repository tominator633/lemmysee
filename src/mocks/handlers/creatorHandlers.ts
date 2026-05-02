import { http, HttpResponse } from "msw";



/* co testuji:
const personId = url.searchParams.get("person_id");

nikdy nevrátí undefined

vrací pouze:
1)string
2)null (když parametr neexistuje)
 */



export const creatorHandlers = [
  http.get(/\/api\/v3\/user/, ({ request }) => {
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");


     /*1) error scenario musí být jako první, jinak by 
     byl 400 u fuknce 3) */
    if (personId === "error") {
      return new HttpResponse(null, { status: 500 });
    }
    /*1) null a empty string odchytit driv nez fuknce 3, 
    pro tu by byl valid) null jako prvni (jinak to neveme typescript
    a bude chtit dat optional parametr*/
    if (personId === null || personId.trim() === "") {
      return new HttpResponse(null, { status: 400 });
    }
    /* scénář  když není ve stringu číslo.
    empty string je ošetřen výše, jinak by se zde 
    parsoval jako 0 (Number("") je 0*/
    const numericPersonId = Number(personId);
    if (Number.isNaN(numericPersonId)) {
      return new HttpResponse(null, { status: 400 });
    }
    if (numericPersonId === 0) {
      return new HttpResponse(null, { status: 404 });
    }

    
    // success scenario: response shape must match ApiPersonResponse
    return HttpResponse.json({
      person_view: {
        person: {
          id: 1,
          name: "john_doe",
          display_name: "John Doe",
          avatar: "https://example.com/avatar.png",
          banner: "https://example.com/banner.png",
          bio: "Mock creator biography.",
          banned: false,
          published: "2024-01-01T00:00:00.000Z",
          updated: "2024-01-10T00:00:00.000Z",
          actor_id: "https://lemmy.world/u/john_doe",
          local: true,
          deleted: false,
          matrix_user_id: null,
          bot_account: false,
          instance_id: 1,
        },
        counts: {
          id: 1,
          person_id: 1,
          post_count: 42,
          post_score: 420,
          comment_count: 88,
          comment_score: 120,
        },
      },
      posts: [],
      comments: [],
      moderates: [],
    });
  }),
];
