import { createAsyncThunk} from '@reduxjs/toolkit';
import type{  ApiCommentListResponse, ApiCommentView } from "./commentsApiTypes";
import { type Comment } from "./commentsSlice";




const extractParentId = (path: string): number | null => {
  const partsArr = path.split(".");
  if (partsArr.length < 3) return null;
  return Number(partsArr[partsArr.length - 2]);
}


export const buildCommentTree = (comments: Comment[]): Comment[] => {
  const map = new Map<string, Comment>();
  const roots: Comment[] = [];

  // 1) init: indexuj všechny komentáře
  for (const comment of comments) {
    comment.replies = [];
    map.set(comment.path, comment);
  }

  // 2) build tree
  for (const comment of comments) {
    /* 
    last index of "." je nejposlednější index jakékoliv tečky: například pro
    0.23466438.23469527.999 je je index poslední tečky mnohem větší než 1
     */
    const lastDotIndex = comment.path.lastIndexOf(".");

    // root comment (jen "0.xxxxxx")
    if (lastDotIndex === 1) {
      roots.push(comment);
      continue;
    }

    const parentPath = comment.path.substring(0, lastDotIndex);
    const parent = map.get(parentPath);

    if (parent) {
      parent.replies.push(comment);
    } else {
      // fallback pokud něco nesedí
      roots.push(comment);
    }
  }

  return roots;
};


/* Thunk */
const baseUrl = "https://lemmy.world/api/v3";
export const loadComments = createAsyncThunk<
    Comment[],           // return type
    string,                  // arg type (permalink)
    { rejectValue: string }  // thunkAPI config
>(
    "comments/loadComments",
    async (postId, thunkAPI) => {
        try {
            const searchEndpoint = `/comment/list?post_id=${postId}&sort=Hot&limit=50`;
            const response = await fetch(baseUrl + searchEndpoint);
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }
            const jsonResponse: ApiCommentListResponse = await response.json();
            const commentsArr: Comment[] = jsonResponse.comments.map((apiCommentView: ApiCommentView) => {
                return {
                    id: String(apiCommentView.comment.id),
                    parentId: extractParentId(apiCommentView.comment.path),
                    author: apiCommentView.creator.name,
                    authorId: String(apiCommentView.creator.id),
                    content: apiCommentView.comment.content,
                    timePublished: apiCommentView.comment.published,
                    score: apiCommentView.counts.score,
                    path: apiCommentView.comment.path,
                    postId: String(apiCommentView.comment.post_id),
                    replies: [],
                } as Comment

            });

             console.log(commentsArr);
             const commentArrTree = buildCommentTree(commentsArr);
             console.log(commentArrTree);
            return commentArrTree;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);