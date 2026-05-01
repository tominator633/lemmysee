import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type PostType } from "../Posts/postsSlice";
import type { RootState } from '../../app/store';
import { loadComments } from "./commentsThunks";
//const proxyUrl = "https://corsproxy.io/?";


/* Types */

export interface Comment {
    id: string;
    parentId: number | null;
    author: string | null;
    authorId: string;
    content: string | null;
    timePublished: string;
    score: number | null;
    path: string;
    postId: string;
    replies: Comment[];
}


export interface CommentsState {
    currentPost: PostType | null;
    comments: Comment[];
    isCommentsLoading: boolean;
    hasCommentsError: boolean;
}



/* Slice */

const initialState: CommentsState = {
    currentPost: null,
    comments: [],
    isCommentsLoading: false,
    hasCommentsError: false,
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
    },
    extraReducers: (builder) => {
        builder.addCase(loadComments.pending, (state) => {
            state.isCommentsLoading = true;
            state.hasCommentsError = false;
        });
        builder.addCase(loadComments.rejected, (state) => {
            state.isCommentsLoading = false;
            state.hasCommentsError = true;
            state.comments = [];
        });
        builder.addCase(loadComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
            state.isCommentsLoading = false;
            state.hasCommentsError = false;
        });
    }
});




export const selectCurrentPost = (state: RootState): PostType | null => state.comments.currentPost;
export const selectComments = (state: RootState): Comment[] => state.comments.comments;
export const selectIsCommentsLoading = (state: RootState): boolean => state.comments.isCommentsLoading;
export const selectHasCommentsError = (state: RootState): boolean => state.comments.hasCommentsError;

export const { setCurrentPost, emptyComments } = commentsSlice.actions;
export default commentsSlice.reducer;