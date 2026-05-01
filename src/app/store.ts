import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/Posts/postsSlice';
import communitiesReducer from '../features/Communities/communitiesSlice';
import commentsReducer from '../features/Comments/commentsSlice';
import  creatorReducer from "../features/Creator/creatorSlice";
import { preloadInitialCommunities } from "../features/Communities/communitiesApi";
import { communitiesApi } from "../features/Communities/communitiesApi"; // Importuj tvé nové API
import { store } from "../main";



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
      comments: commentsReducer,
      creator: creatorReducer,
      // 1. Přidej RTK Query reducer pod jeho unikátním klíčem
      [communitiesApi.reducerPath]: communitiesApi.reducer,
    },
    // 2. Middleware je nezbytný pro cache, polling a další funkce RTK Query
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(communitiesApi.middleware),
    
    preloadedState: {
      communities: {
        swiperCommunities: initialCommunities,
        // Pokud jsi ze slicu odstranil searchedCommunities a loading stavy (jak jsme si psali),
        // tak je sem už nemusíš psát. Nech tu jen to, co v tom slicu zbylo.
        currentCommunity: {},
      },
    },
  });
}

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];