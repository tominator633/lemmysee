import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const proxyUrl = "https://corsproxy.io/?";
const baseUrl = "https://api.reddit.com";

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

export interface CurrentReddit {
    permalink: string;
    score: number;
    user: string;
    created: number;
    title: string;
}

export interface RedditState {
    currentReddit: CurrentReddit | null;
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
    "reddit/loadComments",
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

const initialState: RedditState = {
    currentReddit: null,
    comments: [],
    isCommentsLoading: false,
    hasCommentsError: false,
};

export const redditSlice = createSlice({
    name: "reddit",
    initialState,
    reducers: {
        setCurrentReddit: (state, action: PayloadAction<CurrentReddit | null>) => {
            state.currentReddit = action.payload;
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
export type RootState = { reddit: RedditState };

export const selectCurrentReddit = (state: RootState): CurrentReddit | null => state.reddit.currentReddit;
export const selectComments = (state: RootState): Comment[] => state.reddit.comments;
export const selectIsCommentsLoading = (state: RootState): boolean => state.reddit.isCommentsLoading;
export const selectHasCommentsError = (state: RootState): boolean => state.reddit.hasCommentsError;

export const { setCurrentReddit, emptyComments } = redditSlice.actions;
export default redditSlice.reducer;