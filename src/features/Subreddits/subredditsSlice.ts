import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialSubredditsSelection } from "../../utils/utils";

const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://www.reddit.com";


/* const proxyUrl = "https://reddit-proxy-ftie.onrender.com"; */

/* Types */

export interface Subreddit {
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

export interface SubredditsState {
    swiperSubreddits: Subreddit[];
    searchedSubreddits: Subreddit[];
    isSearchSubredditsLoading: boolean;
    hasSearchSubredditsError: boolean;
    currentSubreddit: Subreddit | Record<string, never>;
}

interface RootState {
    subreddits: SubredditsState;
}

/* Thunk */

export const searchSubreddits = createAsyncThunk<
    Subreddit[],
    string,
    { rejectValue: string }
>(
    "subreddits/searchSubreddits",
    async (searchInput: string, thunkAPI) => {
        try {
            const searchEndpoint = `/subreddits/search.json?q=${searchInput}&limit=20`;
            const response = await fetch(proxyUrl + baseUrl + searchEndpoint);
            /* const response = await fetch(`${proxyUrl}/search?q=${searchInput}`); */
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse = await response.json();
            const searchedSubredditsArr: Subreddit[] = jsonResponse.data.children.map((subreddit: any) => {
                return {
                    name: subreddit.data.display_name,
                    id: subreddit.data.id,
                    subscribers: subreddit.data.subscribers,
                    url: subreddit.data.url,
                    headerTitle: subreddit.data.header_title ?? null,
                    iconImg: subreddit.data.icon_img ?? null,
                    headerImg: subreddit.data.header_img ?? null,
                    bannerImg: subreddit.data.banner_img ?? null,
                    publicDescription: subreddit.data.public_description,
                } as Subreddit;
            });
            
            console.log(searchedSubredditsArr);
            return searchedSubredditsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: SubredditsState = {
    swiperSubreddits: initialSubredditsSelection,
    searchedSubreddits: [],
    isSearchSubredditsLoading: false,
    hasSearchSubredditsError: false,
    currentSubreddit: {},
};

export const subredditsSlice = createSlice({
    name: "subreddits",
    initialState,
    reducers: {
        addSubreddit: (state, action: PayloadAction<Subreddit>) => {
            if (!state.swiperSubreddits.some(subreddit => subreddit.id === action.payload.id)) {
                state.swiperSubreddits.push(action.payload);
                const updatedSearchedSubreddits = state.searchedSubreddits.filter(subreddit => subreddit.id !== action.payload.id);
                state.searchedSubreddits = updatedSearchedSubreddits;
            }
        },
        deleteSubreddit: (state, action: PayloadAction<{ id: string }>) => {
            const deletedSubreddit = state.swiperSubreddits.find(item => item.id === action.payload.id);
            const newArr = state.swiperSubreddits.filter(item => item.id !== action.payload.id);
            state.swiperSubreddits = newArr;
            if (deletedSubreddit) {
                state.searchedSubreddits.unshift(deletedSubreddit);
            }
        },
        setCurrentSubreddit: (state, action: PayloadAction<Subreddit | Record<string, never>>) => {
            state.currentSubreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchSubreddits.pending, (state) => {
                state.isSearchSubredditsLoading = true;
                state.hasSearchSubredditsError = false;
            })
            .addCase(searchSubreddits.rejected, (state) => {
                state.isSearchSubredditsLoading = false;
                state.hasSearchSubredditsError = true;
                state.searchedSubreddits = [];
            })
            .addCase(searchSubreddits.fulfilled, (state, action: PayloadAction<Subreddit[]>) => {
                state.isSearchSubredditsLoading = false;
                state.hasSearchSubredditsError = false;
                state.searchedSubreddits = action.payload;
            });
    }
});

/* Selectors */

export const selectSwiperSubreddits = (state: RootState): Subreddit[] => state.subreddits.swiperSubreddits;
export const selectSearchedSubreddits = (state: RootState): Subreddit[] => state.subreddits.searchedSubreddits;
export const selectIsSearchSubredditsLoading = (state: RootState): boolean => state.subreddits.isSearchSubredditsLoading;
export const selectHasSearchSubredditsError = (state: RootState): boolean => state.subreddits.hasSearchSubredditsError;
export const selectCurrentSubreddit = (state: RootState): Subreddit | Record<string, never> => state.subreddits.currentSubreddit;

export const { addSubreddit, deleteSubreddit, setCurrentSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;