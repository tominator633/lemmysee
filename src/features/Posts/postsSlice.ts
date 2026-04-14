import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiPostItem, ApiPostListResponse } from './postsApiTypes';



/* Types */

export interface Post {
    id: string;
    creator: string;
    timePublished: string;
    community: string;
    title: string;
    text: string | null;
    postUrl: string;
    imgUrl: string | null;
    score: number;
    videoUrl: string | null;
    externalUrl: string | null;
} 


export interface PostsState {
    resultPosts: Post[];
    isLoading: boolean;
    hasError: boolean;
    savedPosts: Post[];
}

interface RootState {
    posts: PostsState;
}




//const baseUrl = "https://lemmy.ml/api/v3";
const baseUrl = "https://lemmy.world/api/v3";

/* Thunk */
export const loadPosts = createAsyncThunk<
    Post[],
    string,
    { rejectValue: string }
>(
    "posts/loadPosts",
    async (communityId: string, thunkAPI) => {
        try {
            const searchEndpoint = `/post/list?community_id=${encodeURIComponent(communityId)}&sort=Hot&limit=15`;
            const response = await fetch(baseUrl + searchEndpoint);
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiPostListResponse = await response.json();
            
            const postsArr: Post[] = jsonResponse.posts.map((apiPostItem: ApiPostItem) => {


                return {
                    id: String(apiPostItem.post.id),
                    creator: apiPostItem.creator.name,
                    timePublished: apiPostItem.post.published,
                    community: apiPostItem.community.name,
                    title: apiPostItem.post.name,
                    text: apiPostItem.post.body ?? null,
                    postUrl: apiPostItem.post.ap_id,
                    imgUrl: apiPostItem.image_details?.link 
                        ?? apiPostItem.post.thumbnail_url 
                        ?? null,
                    score: apiPostItem.counts.score,
                    videoUrl: apiPostItem.post.url_content_type?.startsWith("video/")
                        ? apiPostItem.post.url
                        : null,
                    externalUrl: apiPostItem.post.url_content_type?.startsWith("text/html")
                        ? apiPostItem.post.url
                        : null,
                } as Post;
            });
            
            console.log(jsonResponse);
            return postsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

/* Slice */

const initialState: PostsState = {
    resultPosts: [],
    isLoading: false,
    hasError: false,
    savedPosts: [],
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        savePost: (state, action: PayloadAction<Post>) => {
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
            .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.resultPosts = action.payload;
                state.isLoading = false;
                state.hasError = false;
            });
    }
});

/* Selectors */

export const selectResultPosts = (state: RootState): Post[] => state.posts.resultPosts;
export const selectIsLoading = (state: RootState): boolean => state.posts.isLoading;
export const selectHasError = (state: RootState): boolean => state.posts.hasError;
export const selectSavedPosts = (state: RootState): Post[] => state.posts.savedPosts;

export const filterPosts = (query: string, posts: Post[]): Post[] => {
    return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
};

export const { savePost, unsavePost } = postsSlice.actions;

export default postsSlice.reducer;