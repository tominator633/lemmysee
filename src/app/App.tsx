import React from 'react';
import AppLayout from './AppLayout';
import Posts from '../features/Posts/Posts';
import PostDetailWindow from '../components/PostDetailWindow/PostDetailWindow';
import Communities from '../features/Communities/Communities';
import CommunityDetailWindow from '../components/CommunityDetailWindow/CommunityDetailWindow';
import SavedPosts from '../components/SavedPosts/SavedPosts';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
      <Route path=':communityName' element={<Posts/>}>
        <Route path=':postId' element={<PostDetailWindow/>}/>
      </Route>
      <Route path='communities' element={<Communities/>}>
        <Route path=':communityId' element={<CommunityDetailWindow/>} />
      </Route>
      <Route path='saved' element={<SavedPosts/>}>
        <Route path=':postId' element={<PostDetailWindow/>}/>
      </Route>
  </Route>
));

export default function App(): React.ReactElement {
  return (
    <RouterProvider router={appRouter} />
  );
}


