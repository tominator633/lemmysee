import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { type PostType, type PostsState } from "./postsTypes";


const initialState: PostsState = {
    savedPosts: [],
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
        }
    }
});



/* Selectors */
export const selectSavedPosts = (state: RootState): PostType[] => state.posts.savedPosts;

export const { savePost, unsavePost } = postsSlice.actions;

export default postsSlice.reducer;