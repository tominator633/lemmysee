import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* const proxyUrl = "https://reddit-proxy-ftie.onrender.com"; */
const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://www.reddit.com";

/* Types */

export interface Reddit {
    id: string;
    user: string;
    created: number;
    subreddit: string;
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
}

export interface RedditsState {
    resultReddits: Reddit[];
    isLoading: boolean;
    hasError: boolean;
    savedReddits: Reddit[];
}

interface RootState {
    reddits: RedditsState;
}

interface RedditPost {
    data: {
        id: string;
        author: string;
        created: number;
        subreddit: string;
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
}

interface ApiResponse {
    data: {
        children: RedditPost[];
    };
}

/* Thunk */

export const loadReddits = createAsyncThunk<
    Reddit[],
    string,
    { rejectValue: string }
>(
    "reddits/loadReddits",
    async (subreddit: string = "popular", thunkAPI) => {
        try {
            const searchEndpoint = `/r/${subreddit}.json`;
            const response = await fetch(proxyUrl + baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiResponse = await response.json();
            
            const redditsArr: Reddit[] = jsonResponse.data.children.map((post: RedditPost) => {

                let imgThumbnail: string | null;
                const thumbnailIsImg = /\.(jpeg|jpg|png)$/i;
                if (thumbnailIsImg.test(post.data.thumbnail)) {
                    imgThumbnail = post.data.thumbnail;
                } else {
                    imgThumbnail = null;
                }

                let imgUrl: string | null;
                const urlIncludesImg = /\.(jpeg|jpg|png)$/i;
                if (urlIncludesImg.test(post.data.url)) {
                    imgUrl = post.data.url;
                } else {
                    imgUrl = null;
                }

                let videoUrl: string | null;
                let videoDashUrl: string | null;
                if (post.data.is_video && post.data.media?.reddit_video) {
                    videoUrl = post.data.media.reddit_video.fallback_url;
                    videoDashUrl = post.data.media.reddit_video.dash_url;
                } else {
                    videoUrl = null;
                    videoDashUrl = null;
                }
        
                return {
                    id: post.data.id,
                    user: post.data.author,
                    created: post.data.created,
                    subreddit: post.data.subreddit,
                    title: post.data.title,
                    text: post.data.selftext,
                    imgSrc: imgUrl,
                    isVideo: post.data.is_video,
                    videoSrc: videoUrl,
                    videoDashUrl: videoDashUrl,
                    score: post.data.score,
                    thumbnail: imgThumbnail,
                    url: post.data.url,
                    isSelfpost: post.data.is_self,
                    permalink: post.data.permalink,
                } as Reddit;
            });
            
            console.log(jsonResponse);
            return redditsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: RedditsState = {
    resultReddits: [],
    isLoading: false,
    hasError: false,
    savedReddits: [],
};

export const redditsSlice = createSlice({
    name: "reddits",
    initialState,
    reducers: {
        saveReddit: (state, action: PayloadAction<Reddit>) => {
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
            .addCase(loadReddits.fulfilled, (state, action: PayloadAction<Reddit[]>) => {
                state.resultReddits = action.payload;
                state.isLoading = false;
                state.hasError = false;
            });
    }
});

/* Selectors */

export const selectResultReddits = (state: RootState): Reddit[] => state.reddits.resultReddits;
export const selectIsLoading = (state: RootState): boolean => state.reddits.isLoading;
export const selectHasError = (state: RootState): boolean => state.reddits.hasError;
export const selectSavedReddits = (state: RootState): Reddit[] => state.reddits.savedReddits;

export const filterReddits = (query: string, reddits: Reddit[]): Reddit[] => {
    return reddits.filter(reddit => reddit.title.toLowerCase().includes(query.toLowerCase()));
};

export const { saveReddit, unsaveReddit } = redditsSlice.actions;

export default redditsSlice.reducer;