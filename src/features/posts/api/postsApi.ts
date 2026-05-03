
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mapApiPostItemToPost } from "../lib/postsMapper";
import { type PostType } from "../model/postsTypes";
import { type ApiPostListResponse } from "./postsApiTypes";


export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lemmy.world/api/v3",
  }),

  endpoints: (builder) => ({
    getPostsByCommunity: builder.query<PostType[], { communityId: string }>({
      query: ({ communityId }) => ({
        url: "/post/list",
        params: {
          community_id: communityId,
          sort: "Hot",
          limit: 40,
        },
      }),

      transformResponse: (response: ApiPostListResponse) =>
        response.posts.map(mapApiPostItemToPost),
    }),
  }),
});

export const { useGetPostsByCommunityQuery } = postsApi;