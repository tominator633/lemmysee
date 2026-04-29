
import { createRoot } from 'react-dom/client';
import App from './app/App';
import {createAppStore} from './app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root not found');
}
const root = createRoot(container);

/* 
store is not ready until its all promises have been resolved,
so i have to 
 */
const store = await createAppStore();



root.render(
    <Provider store={store}>
      <App />
    </Provider>  
);

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']