import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiCommunityResponse, ApiCommunityView, ApiSearchResponse } from "../api/communitiesApiTypes";
import { type Community } from "../model/communitiesTypes";
import { mapApiCommunityViewToCommunityDomain } from "../lib/communitiesMapper";





export const preloadInitialCommunities = async (initialCommunitiesIds: string[]): Promise<Community[]> => {
  try {
    //here we have to wait until every promise is resolved, thats why Promise.all
    const initialCommunities: Community[] = await Promise.all(
      initialCommunitiesIds.map(async (id) => {
        const urlToFetch = `https://lemmy.world/api/v3/community?id=${id}`;
        const response = await fetch(urlToFetch);

        if (!response.ok) {
          throw new Error(`Failed to fetch community ${id}: ${response.statusText}`);
        }

        const jsonResponse: ApiCommunityResponse = await response.json();
        const apiCommunityView: ApiCommunityView = jsonResponse.community_view;

        return mapApiCommunityViewToCommunityDomain(apiCommunityView);
      })
    );

    return initialCommunities;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}







export const communitiesApi = createApi({
  reducerPath: 'communitiesApi', // unikátní klíč v Redux storu
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lemmy.world/api/v3' }),
  endpoints: (builder) => ({
    // Definice endpointu pro vyhledávání
    searchCommunities: builder.query<Community[], string>({
      query: (searchInput) => ({
        url: '/search',
        params: {
          q: searchInput,
          type_: 'Communities',
          limit: 40,
        },
      }),
      // Zde využijeme tvůj mapper
      transformResponse: (response: ApiSearchResponse): Community[] => {
        return response.communities.map(mapApiCommunityViewToCommunityDomain);
      },
    }),
  }),
});

// RTK Query automaticky vygeneruje hook pro tvůj endpoint
export const { useSearchCommunitiesQuery } = communitiesApi;