import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../features/posts/model/postsSlice';
import communitiesReducer from '../../features/communities/model/communitiesSlice';
import { preloadInitialCommunities } from "../../features/communities/api/communitiesApi";
import { communitiesApi } from "../../features/communities/api/communitiesApi";
import { creatorApi } from "../../features/creator/api/creatorApi";
import { commentsApi } from "../../features/comments/api/commentsApi";
import { postsApi } from "../../features/posts/api/postsApi";




const initialCommunitiesIds = [
  "3106", 
  "12",
  "2840", 
  "11684",
  "761207",
  "2475",
  "2508",
  "1496",
  "4464"];


/* tohle celé musí být zabalené, celý store musí být připravený
s resolved hodnotami  
store.ts = definice
main.tsx = runtime / bootstrap
async věci se volají v bootstrapu, ne v definici*/
export async function createAppStore() {
  const initialCommunities = await preloadInitialCommunities(initialCommunitiesIds);

  return configureStore({
    reducer: {
      posts: postsReducer,
      communities: communitiesReducer,
      // 1. Přidej RTK Query reducer pod jeho unikátním klíčem
      [communitiesApi.reducerPath]: communitiesApi.reducer,
      [creatorApi.reducerPath]: creatorApi.reducer,
      [commentsApi.reducerPath]: commentsApi.reducer,
      [postsApi.reducerPath]: postsApi.reducer,
    },
    // 2. Middleware je nezbytný pro cache, polling a další funkce RTK Query
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        communitiesApi.middleware, 
        creatorApi.middleware, 
        commentsApi.middleware,
        postsApi.middleware
      ),
    
    preloadedState: {
      communities: {
        swiperCommunities: initialCommunities,
        currentCommunity: {},
      },
    },
  });
}

// Get the type of our store variable
export type AppStore = Awaited<ReturnType<typeof createAppStore>>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

