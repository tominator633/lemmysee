import { configureStore } from '@reduxjs/toolkit';
import redditsReducer from '../features/Reddits/redditsSlice';
import subredditsReducer from '../features/Subreddits/subredditsSlice';
import redditReducer from '../features/Reddit/redditSlice';

export const store = configureStore({
    reducer: {
        reddits: redditsReducer,
        subreddits: subredditsReducer,
        reddit: redditReducer,
    }
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']