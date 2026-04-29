
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
export const store = await createAppStore();



root.render(
    <Provider store={store}>
      <App />
    </Provider>  
);

