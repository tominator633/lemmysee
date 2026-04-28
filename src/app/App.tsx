import React from 'react';
import AppLayout from './AppLayout';
import Posts from '../features/Posts/Posts';
import Comments from '../features/Comments/Comments';
import Communities from '../features/Communities/Communities';
import CommunityDetailWindow from '../components/CommunityDetailWindow/CommunityDetailWindow';
import CreatorDetailWindow from "../components/CreatorDetailWindow/CreatorDetailWindow";
import SavedPosts from '../features/Posts/SavedPosts/SavedPosts';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
      <Route path=':communityId' element={<Posts/>}>
        <Route path=':postId' element={<Comments/>}/>
        <Route path='creator/:creatorId' element={<CreatorDetailWindow/>}/>
      </Route>
      <Route path='communities' element={<Communities/>}>
        <Route path=':communityId' element={<CommunityDetailWindow/>} />
      </Route>
      <Route path='saved' element={<SavedPosts/>}>
        <Route path=':postId' element={<Comments/>}/>
        <Route path='creator/:creatorId' element={<CreatorDetailWindow/>}/>
      </Route>
  </Route>
));

export default function App(): React.ReactElement {
  return (
    <RouterProvider router={appRouter} />
  );
}


