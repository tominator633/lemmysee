import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store/store';
import { type PostType, type PostsState } from "./postsTypes";


const initialState: PostsState = {
    savedPosts: [],
    currentPost: null,
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        savePost: (state, action: PayloadAction<PostType>) => {
            if (!state.savedPosts.some(post => post.id === action.payload.id)) {
                state.savedPosts.push(action.payload);
            }
        },
        unsavePost: (state, action: PayloadAction<{ id: string }>) => {
            const updatedSavedPostsArr = state.savedPosts.filter(post => post.id !== action.payload.id);
            state.savedPosts = updatedSavedPostsArr;
        },
        setCurrentPost: (state, action: PayloadAction<PostType | null>) => {
            state.currentPost = action.payload;
        }
    }
});



/* Selectors */
export const selectSavedPosts = (state: RootState): PostType[] => state.posts.savedPosts;
export const selectCurrentPost = (state: RootState): PostType | null => state.posts.currentPost;

export const { savePost, unsavePost, setCurrentPost } = postsSlice.actions;

export default postsSlice.reducer;