
import AppLayout from '../../widgets/AppLayout/AppLayout';
import Posts from '../../pages/Posts/Posts';
import Comments from '../../features/comments/ui/Comments/Comments';
import Communities from '../../pages/Communities/Communities';
import CommunityDetailWindow from '../../features/communities/ui/CommunityDetailWindow/CommunityDetailWindow';
import CreatorDetailWindow from "../../features/creator/ui/CreatorDetailWindow/CreatorDetailWindow";
import SavedPosts from '../../pages/SavedPosts/SavedPosts';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';




export const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} >
      <Route path=':communityId' element={<Posts/>}>
        <Route path=':postId' element={<Comments/>}>
          <Route path='comment_creator/:creatorId' element={<CreatorDetailWindow/>}/>
        </Route>
        <Route path='post_creator/:creatorId' element={<CreatorDetailWindow/>}/>
      </Route>
      <Route path='communities' element={<Communities/>}>
        <Route path=':communityId' element={<CommunityDetailWindow/>} />
      </Route>
      <Route path='saved' element={<SavedPosts/>}>
        <Route path=':postId' element={<Comments/>}>
          <Route path='comment_creator/:creatorId' element={<CreatorDetailWindow/>}/>
        </Route>
        <Route path='creator/:creatorId' element={<CreatorDetailWindow/>}/>
      </Route>
  </Route>
));