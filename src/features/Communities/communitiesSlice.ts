import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialCommunitiesSelection } from "../../utils/utils";
import type { ApiSearchResponse, ApiCommunityView } from "./communitiesApiTypes";



/* Types */

export interface Community {
  id: string;
  name: string;
  subscribers: number;
  headerTitle: string;
  iconImg: string | null;
  bannerImg: string | null;
  description: string | null;
  isHidden: boolean;
  isBlocked: boolean;
}

export interface CommunitiesState {
    swiperCommunities: Community[];
    searchedCommunities: Community[];
    isSearchCommunitiesLoading: boolean;
    hasSearchCommunitiesError: boolean;
    currentCommunity: Community | Record<string, never>;
}

interface RootState {
    communities: CommunitiesState;
}







//const baseUrl = "https://lemmy.ml/api/v3";
const baseUrl = "https://lemmy.world/api/v3";



/* Thunk */

export const searchCommunities = createAsyncThunk<
    Community[],
    string,
    { rejectValue: string }
>(
    "communities/searchCommunities",
    async (searchInput: string, thunkAPI) => {
        try {
            const searchEndpoint = `/search?q=${encodeURIComponent(searchInput)}&type_=Communities&limit=40`;
            const response = await fetch(baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiSearchResponse = await response.json();
            const searchedCommunitiesArr: Community[] = jsonResponse.communities.map((apiCommunityView: ApiCommunityView) => {
                return {
                    name: apiCommunityView.community.name,
                    id: String(apiCommunityView.community.id),
                    subscribers: apiCommunityView.counts.subscribers,
                    headerTitle: apiCommunityView.community.title,
                    iconImg: apiCommunityView.community.icon ?? null,
                    bannerImg: apiCommunityView.community.banner ?? null,
                    description: apiCommunityView.community.description ?? null,
                    isHidden: apiCommunityView.community.hidden,
                    isBlocked: apiCommunityView.blocked
                } as Community;
            });
            
            console.log(searchedCommunitiesArr);
            return searchedCommunitiesArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: CommunitiesState = {
    swiperCommunities: initialCommunitiesSelection,
    searchedCommunities: [],
    isSearchCommunitiesLoading: false,
    hasSearchCommunitiesError: false,
    currentCommunity: {},
};

export const communitiesSlice = createSlice({
    name: "communities",
    initialState,
    reducers: {
        addCommunity: (state, action: PayloadAction<Community>) => {
            if (!state.swiperCommunities.some(community => community.id === action.payload.id)) {
                state.swiperCommunities.push(action.payload);
                const updatedSearchedCommunities = state.searchedCommunities.filter(community => community.id !== action.payload.id);
                state.searchedCommunities = updatedSearchedCommunities;
            }
        },
        deleteCommunity: (state, action: PayloadAction<{ id: string }>) => {
            const deletedCommunity = state.swiperCommunities.find(item => item.id === action.payload.id);
            const newArr = state.swiperCommunities.filter(item => item.id !== action.payload.id);
            state.swiperCommunities = newArr;
            if (deletedCommunity) {
                state.searchedCommunities.unshift(deletedCommunity);
            }
        },
        setCurrentCommunity: (state, action: PayloadAction<Community | Record<string, never>>) => {
            state.currentCommunity = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchCommunities.pending, (state) => {
                state.isSearchCommunitiesLoading = true;
                state.hasSearchCommunitiesError = false;
            })
            .addCase(searchCommunities.rejected, (state) => {
                state.isSearchCommunitiesLoading = false;
                state.hasSearchCommunitiesError = true;
                state.searchedCommunities = [];
            })
            .addCase(searchCommunities.fulfilled, (state, action: PayloadAction<Community[]>) => {
                state.isSearchCommunitiesLoading = false;
                state.hasSearchCommunitiesError = false;
                state.searchedCommunities = action.payload;
            });
    }
});

/* Selectors */

export const selectSwiperCommunities = (state: RootState): Community[] => state.communities.swiperCommunities;
export const selectSearchedCommunities = (state: RootState): Community[] => state.communities.searchedCommunities;
export const selectIsSearchCommunitiesLoading = (state: RootState): boolean => state.communities.isSearchCommunitiesLoading;
export const selectHasSearchCommunitiesError = (state: RootState): boolean => state.communities.hasSearchCommunitiesError;
export const selectCurrentCommunity = (state: RootState): Community | Record<string, never> => state.communities.currentCommunity;

export const { addCommunity, deleteCommunity, setCurrentCommunity } = communitiesSlice.actions;

export default communitiesSlice.reducer;