import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiPostItem, ApiPostListResponse, LemmySeePost } from '../../types';



/* Types */

/* export interface Reddit {
    id: string;
    user: string;
    created: number;
    community: string;
    title: string;
    text: string;
    imgSrc: string | null;
    isVideo: boolean;
    videoSrc: string | null;
    videoDashUrl: string | null;
    score: number;
    thumbnail: string | null;
    url: string;
    isSelfpost: boolean;
    permalink: string;
} */

export interface LemmyPostsState {
    resultReddits: LemmySeePost[];
    isLoading: boolean;
    hasError: boolean;
    savedReddits: LemmySeePost[];
}

interface RootState {
    reddits: LemmyPostsState;
}

/* interface RedditPost {
    data: {
        id: string;
        author: string;
        created: number;
        community: string;
        title: string;
        selftext: string;
        thumbnail: string;
        url: string;
        is_video: boolean;
        media?: {
            reddit_video: {
                fallback_url: string;
                dash_url: string;
            };
        };
        score: number;
        is_self: boolean;
        permalink: string;
    };
} */

/* interface ApiResponse {
    data: {
        children: RedditPost[];
    };
} */


/* "https://lemmy.ml/api/v3/community?name=memes" */
/* const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://www.reddit.com"; */


const baseUrl = "https://lemmy.ml/api/v3";


/* Thunk */
export const loadReddits = createAsyncThunk<
    LemmySeePost[],
    string,
    { rejectValue: string }
>(
    "reddits/loadReddits",
    async (community: string = "memes", thunkAPI) => {
        try {
            const searchEndpoint = `/post/list?community_name=${community}&sort=Hot&limit=5`;
            const response = await fetch(baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiPostListResponse = await response.json();
            
            const redditsArr: LemmySeePost[] = jsonResponse.posts.map((apiPostItem: ApiPostItem) => {

                return {
                    id: String(apiPostItem.post.id),
                    creator: apiPostItem.creator.name,
                    timePublished: apiPostItem.post.published,
                    community: apiPostItem.community.name,
                    title: apiPostItem.post.name,
                } as LemmySeePost;
            });
            
            console.log(jsonResponse);
            return redditsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: LemmyPostsState = {
    resultReddits: [],
    isLoading: false,
    hasError: false,
    savedReddits: [],
};

export const redditsSlice = createSlice({
    name: "reddits",
    initialState,
    reducers: {
        saveReddit: (state, action: PayloadAction<LemmySeePost>) => {
            if (!state.savedReddits.some(reddit => reddit.id === action.payload.id)) {
                state.savedReddits.push(action.payload);
            }
        },
        unsaveReddit: (state, action: PayloadAction<{ id: string }>) => {
            const updatedSavedRedditsArr = state.savedReddits.filter(reddit => reddit.id !== action.payload.id);
            state.savedReddits = updatedSavedRedditsArr;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadReddits.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.resultReddits = [];
            })
            .addCase(loadReddits.fulfilled, (state, action: PayloadAction<LemmySeePost[]>) => {
                state.resultReddits = action.payload;
                state.isLoading = false;
                state.hasError = false;
            });
    }
});

/* Selectors */

export const selectResultReddits = (state: RootState): LemmySeePost[] => state.reddits.resultReddits;
export const selectIsLoading = (state: RootState): boolean => state.reddits.isLoading;
export const selectHasError = (state: RootState): boolean => state.reddits.hasError;
export const selectSavedReddits = (state: RootState): LemmySeePost[] => state.reddits.savedReddits;

export const filterReddits = (query: string, reddits: LemmySeePost[]): LemmySeePost[] => {
    return reddits.filter(reddit => reddit.title.toLowerCase().includes(query.toLowerCase()));
};

export const { saveReddit, unsaveReddit } = redditsSlice.actions;

export default redditsSlice.reducer;