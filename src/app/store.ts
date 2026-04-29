import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/Posts/postsSlice';
import communitiesReducer from '../features/Communities/communitiesSlice';
import commentsReducer from '../features/Comments/commentsSlice';
import  creatorReducer from "../features/Creator/creatorSlice";
import { preloadInitialCommunities } from "../utils/utils";



const initialCommunitiesIds = [
  "3106", 
  "12",
  "2840", 
  "11684",
  "761207",
  "2475",
  "2508",
  "1496",]


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
    },
    preloadedState: {
      communities: {
        swiperCommunities: initialCommunities,
        searchedCommunities: [],
        isSearchCommunitiesLoading: false,
        hasSearchCommunitiesError: false,
        currentCommunity: {},
      },
    },
  });
}

