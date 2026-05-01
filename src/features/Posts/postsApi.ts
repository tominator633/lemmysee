
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mapApiPostItemToPost } from "./postsMapper";
import { type PostType } from "./postsTypes";
import { type ApiPostListResponse } from "./postsApiTypes";



export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://lemmy.world/api/v3"}),

  endpoints: (builder) => ({
    getPostsByCommunity: builder.query<PostType[], string>({
      query: (communityId) => `/post/list?community_id=${encodeURIComponent(communityId)}&sort=Hot&limit=40`,
      transformResponse: (response: ApiPostListResponse): PostType[] => {
        return response.posts.map(mapApiPostItemToPost);
      },
    }),
  }),
});

export const { useGetPostsByCommunityQuery } = postsApi;