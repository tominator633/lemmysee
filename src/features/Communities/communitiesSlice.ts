import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialCommunitiesSelection } from "../../utils/utils";

const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://www.post.com";


/* const proxyUrl = "https://post-proxy-ftie.onrender.com"; */

/* Types */

export interface Community {
    name: string;
    id: string;
    subscribers: number;
    url: string;
    headerTitle: string | null;
    iconImg: string | null;
    headerImg: string | null;
    bannerImg: string | null;
    publicDescription: string;
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

/* Thunk */

export const searchCommunities = createAsyncThunk<
    Community[],
    string,
    { rejectValue: string }
>(
    "communities/searchCommunities",
    async (searchInput: string, thunkAPI) => {
        try {
            const searchEndpoint = `/communities/search.json?q=${searchInput}&limit=20`;
            const response = await fetch(proxyUrl + baseUrl + searchEndpoint);
            /* const response = await fetch(`${proxyUrl}/search?q=${searchInput}`); */
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse = await response.json();
            const searchedCommunitiesArr: Community[] = jsonResponse.data.children.map((community: any) => {
                return {
                    name: community.data.display_name,
                    id: community.data.id,
                    subscribers: community.data.subscribers,
                    url: community.data.url,
                    headerTitle: community.data.header_title ?? null,
                    iconImg: community.data.icon_img ?? null,
                    headerImg: community.data.header_img ?? null,
                    bannerImg: community.data.banner_img ?? null,
                    publicDescription: community.data.public_description,
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