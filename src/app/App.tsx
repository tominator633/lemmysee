import React from 'react';
import AppLayout from './AppLayout';
import Reddits from '../features/Reddits/Reddits';
import RedditDetailWindow from '../components/RedditDetailWindow/RedditDetailWindow';
import Communities from '../features/Communities/Communities';
import CommunityDetailWindow from '../components/CommunityDetailWindow/CommunityDetailWindow';
import SavedReddits from '../components/SavedReddits/SavedReddits';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
      <Route path=':communityName' element={<Reddits/>}>
        <Route path=':redditId' element={<RedditDetailWindow/>}/>
      </Route>
      <Route path='communities' element={<Communities/>}>
        <Route path=':communityId' element={<CommunityDetailWindow/>} />
      </Route>
      <Route path='saved' element={<SavedReddits/>}>
        <Route path=':redditId' element={<RedditDetailWindow/>}/>
      </Route>
  </Route>
));

export default function App(): React.ReactElement {
  return (
    <RouterProvider router={appRouter} />
  );
}


