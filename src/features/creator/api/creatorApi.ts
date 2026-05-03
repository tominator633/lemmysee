import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Creator } from "../model/creatorTypes";
import { mapApiPersonResponseToCreatorDomain } from "../lib/creatorMapper";
import { type ApiPersonResponse } from "./creatorApiTypes";

export const creatorApi = createApi({
  reducerPath: "creatorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lemmy.world/api/v3",
  }),
  endpoints: (builder) => ({
    getCreator: builder.query<Creator, string>({
      query: (creatorId) => ({
        url: "/user",
        params: {
          person_id: creatorId,
        },
      }),

      transformResponse: (response: ApiPersonResponse) =>
        mapApiPersonResponseToCreatorDomain(response),

      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetCreatorQuery } = creatorApi;