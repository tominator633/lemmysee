import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type{  ApiCommentListResponse, ApiCommentView } from "./commentsApiTypes";

//const proxyUrl = "https://corsproxy.io/?";


/* Types */

export interface Comment {
    id: string;
    parentId: number | null;
    author: string | null;
    content: string | null;
    created: number | null;
    score: number | null;
    kind: string | null;
    path: number;
    postId: string;
    replies: Comment[];
}


export interface CurrentPost {
    permalink: string;
    score: number;
    user: string;
    created: number;
    title: string;
}

export interface CommentsState {
    currentPost: CurrentPost | null;
    comments: Comment[];
    isCommentsLoading: boolean;
    hasCommentsError: boolean;
}

function extractParentId(path: string): number | null {
  const parts = path.split(".");
  if (parts.length <= 2) return null;
  return Number(parts[parts.length - 2]);
}

export function mapComments(api: ApiCommentView[]): Comment[] {
  return api.map((item) => ({
    id: item.comment.id,
    parentId: extractParentId(item.comment.path),

    content: item.comment.content,

    author: item.creator.display_name ?? item.creator.name,
    authorAvatar: item.creator.avatar ?? null,

    score: item.counts.score,
    createdAt: item.comment.published,

    children: [], // filled later
  }));
}



/* Thunk */
const baseUrl = "https://lemmy.world/api/v3";
export const loadComments = createAsyncThunk<
    Comment[],           // return type
    string,                  // arg type (permalink)
    { rejectValue: string }  // thunkAPI config
>(
    "comments/loadComments",
    async (postId, thunkAPI) => {
        try {
            const searchEndpoint = `/comment/list?post_id=${postId}&sort=Hot&limit=3`;
            
            const response = await fetch(baseUrl + searchEndpoint);

            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse: ApiCommentListResponse = await response.json();

            const commentsArr: Comment[] = jsonResponse.comments.map((apiCommentView: ApiCommentView) => {
                return {
                    id: String(apiCommentView.comment.id),
                    parentId: extractParentId(apiCommentView.comment.path),
                    author: apiCommentView.creator.name,
                    content: apiCommentView.comment.content,
                    created: apiCommentView.comment.published,
                    score: apiCommentView.counts.score,
                    path: apiCommentView.comment.path,
                    postId: String(apiCommentView.comment.post_id),
                    replies: [],
                } as Comment

            });

            // console.log(commentsArr);
            return commentsArr;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.message ?? "Unknown error");
        }
    }
);

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
        setCurrentPost: (state, action: PayloadAction<CurrentPost | null>) => {
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

/* Selectors */

/**
 * If you have a RootState type in your store, replace the inline type below with it:
 *   import type { RootState } from '../../app/store';
 */
export type RootState = { comments: CommentsState };

export const selectCurrentPost = (state: RootState): CurrentPost | null => state.comments.currentPost;
export const selectComments = (state: RootState): Comment[] => state.comments.comments;
export const selectIsCommentsLoading = (state: RootState): boolean => state.comments.isCommentsLoading;
export const selectHasCommentsError = (state: RootState): boolean => state.comments.hasCommentsError;

export const { setCurrentPost, emptyComments } = commentsSlice.actions;
export default commentsSlice.reducer;