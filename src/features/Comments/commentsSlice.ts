import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://api.post.com";

/* Types */

export interface Reply {
    rAuthor: string | null;
    rBody: string | null;
    rCreated: number | null;
    rScore: number | null;
    rKind: string | null;
}

export interface Comment {
    author: string | null;
    body: string | null;
    created: number | null;
    score: number | null;
    kind: string | null;
    replies: Reply[];
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

/* Thunk */

export const loadComments = createAsyncThunk<
    Comment[],           // return type
    string,                  // arg type (permalink)
    { rejectValue: string }  // thunkAPI config
>(
    "comments/loadComments",
    async (permalink, thunkAPI) => {
        try {
            const searchEndpoint = `/${permalink}.json`;
            const response = await fetch(proxyUrl + baseUrl + searchEndpoint);

            if (!response.ok) {
                return thunkAPI.rejectWithValue(`Network error: ${response.status}`);
            }

            const jsonResponse = await response.json();

            const commentsArr: Comment[] = (jsonResponse?.[1]?.data?.children || [])
                .map((post: any) => {
                    const repliesRaw = post?.data?.replies;
                    const replies: Reply[] = Array.isArray(repliesRaw?.data?.children)
                        ? repliesRaw.data.children
                            .map((reply: any) => ({
                                rAuthor: reply?.data?.author ?? null,
                                rBody: reply?.data?.body ?? null,
                                rCreated: reply?.data?.created ?? null,
                                rScore: reply?.data?.score ?? null,
                                rKind: reply?.kind ?? null,
                            }))
                            .filter((r: Reply) => r.rKind === "t1")
                        : [];

                    return {
                        author: post?.data?.author ?? null,
                        body: post?.data?.body ?? null,
                        created: post?.data?.created ?? null,
                        score: post?.data?.score ?? null,
                        kind: post?.kind ?? null,
                        replies,
                    } as Comment;
                })
                .filter((post: Comment) => post.kind === "t1");

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