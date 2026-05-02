import { http, HttpResponse } from "msw";


/* co testuji:
const personId = url.searchParams.get("post_id");

nikdy nevrátí undefined

vrací pouze:
1)string
2)null (když parametr neexistuje)
 */


export const commentsHandlers = [
  http.get(/\/api\/v3\/comment\/list/, ({ request }) => {
    const url = new URL(request.url);
    const postId = url.searchParams.get("post_id");

     /*1) error scenario musí být jako první, jinak by 
     byl 400 u fuknce 3) */
    if (postId === "error") {
      return new HttpResponse(null, { status: 500 });
    }
    /*1) null a empty string odchytit driv nez fuknce 3, 
    pro tu by byl valid) null jako prvni (jinak to neveme typescript
    a bude chtit dat optional parametr*/
    if (postId === null || postId.trim() === "") {
      return new HttpResponse(null, { status: 400 });
    }
    /* scénář  když není ve stringu číslo.
    empty string je ošetřen výše, jinak by se zde 
    parsoval jako 0 (Number("") je 0, zde resime " " s whitespace*/
    const numericPostId = Number(postId);
    if (Number.isNaN(numericPostId)) {
      return new HttpResponse(null, { status: 400 });
    }
    if (numericPostId === 0) {
      return new HttpResponse(null, { status: 404 });
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