import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type PostType } from "../Posts/postsTypes";
import type { RootState } from '../../app/store';
import { type Comment, type CommentsState } from "./commentsTypes";
//const proxyUrl = "https://corsproxy.io/?";



const initialState: CommentsState = {
    currentPost: null,
    comments: [],
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setCurrentPost: (state, action: PayloadAction<PostType | null>) => {
            state.currentPost = action.payload;
        },
        emptyComments: (state) => {
            state.comments = [];
        }
    }
});




export const selectCurrentPost = (state: RootState): PostType | null => state.comments.currentPost;
export const selectComments = (state: RootState): Comment[] => state.comments.comments;

export const { setCurrentPost, emptyComments } = commentsSlice.actions;
export default commentsSlice.reducer;