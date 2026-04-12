import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiPostItem, ApiPostListResponse, LemmySeePost } from '../../types';



/* Types */

/* export interface Post {
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
    resultPosts: LemmySeePost[];
    isLoading: boolean;
    hasError: boolean;
    savedPosts: LemmySeePost[];
}

interface RootState {
    posts: LemmyPostsState;
}

/* interface PostPost {
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
            post_video: {
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
        children: PostPost[];
    };
} */


/* "https://lemmy.ml/api/v3/community?name=memes" */
/* const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://www.post.com"; */


const baseUrl = "https://lemmy.ml/api/v3";


/* Thunk */
export const loadPosts = createAsyncThunk<
    LemmySeePost[],
    string,
    { rejectValue: string }
>(
    "posts/loadPosts",
    async (community: string = "memes", thunkAPI) => {
        try {
            const searchEndpoint = `/post/list?community_name=${community}&sort=Hot&limit=5`;
            const response = await fetch(baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiPostListResponse = await response.json();
            
            const postsArr: LemmySeePost[] = jsonResponse.posts.map((apiPostItem: ApiPostItem) => {

                return {
                    id: String(apiPostItem.post.id),
                    creator: apiPostItem.creator.name,
                    timePublished: apiPostItem.post.published,
                    community: apiPostItem.community.name,
                    title: apiPostItem.post.name,
                } as LemmySeePost;
            });
            
            console.log(jsonResponse);
            return postsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: LemmyPostsState = {
    resultPosts: [],
    isLoading: false,
    hasError: false,
    savedPosts: [],
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        savePost: (state, action: PayloadAction<LemmySeePost>) => {
            if (!state.savedPosts.some(post => post.id === action.payload.id)) {
                state.savedPosts.push(action.payload);
            }
        },
        unsavePost: (state, action: PayloadAction<{ id: string }>) => {
            const updatedSavedPostsArr = state.savedPosts.filter(post => post.id !== action.payload.id);
            state.savedPosts = updatedSavedPostsArr;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.resultPosts = [];
            })
            .addCase(loadPosts.fulfilled, (state, action: PayloadAction<LemmySeePost[]>) => {
                state.resultPosts = action.payload;
                state.isLoading = false;
                state.hasError = false;
            });
    }
});

/* Selectors */

export const selectResultPosts = (state: RootState): LemmySeePost[] => state.posts.resultPosts;
export const selectIsLoading = (state: RootState): boolean => state.posts.isLoading;
export const selectHasError = (state: RootState): boolean => state.posts.hasError;
export const selectSavedPosts = (state: RootState): LemmySeePost[] => state.posts.savedPosts;

export const filterPosts = (query: string, posts: LemmySeePost[]): LemmySeePost[] => {
    return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
};

export const { savePost, unsavePost } = postsSlice.actions;

export default postsSlice.reducer;