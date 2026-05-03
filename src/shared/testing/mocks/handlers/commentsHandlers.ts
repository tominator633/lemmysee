import { http, HttpResponse } from "msw";
import { mockHandlerComments } from "../data/commentsMocks";


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
    return HttpResponse.json({ comments: mockHandlerComments });
  }),
];