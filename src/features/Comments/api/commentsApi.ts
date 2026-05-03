import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mapApiCommentViewToCommentDomain } from "../lib/commentsMapper";
import { type ApiCommentListResponse } from "./commentsApiTypes";
import { type Comment } from "../model/commentsTypes";
import { buildCommentTree } from "../lib/buildCommentTree";


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





