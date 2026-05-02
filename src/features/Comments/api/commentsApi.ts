import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mapApiCommentViewToCommentDomain } from "./commentsMapper";
import { type ApiCommentListResponse } from "./commentsApiTypes";
import { type Comment } from "../commentsTypes";



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

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lemmy.world/api/v3' }),

  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/comment/list?post_id=${postId}&sort=Hot&limit=50`,
      transformResponse: (json: ApiCommentListResponse): Comment[] => {
        const flatComments: Comment[] = json.comments.map(mapApiCommentViewToCommentDomain);
        return buildCommentTree(flatComments);
      },
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;





