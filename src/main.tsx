
import { createRoot } from 'react-dom/client';
import App from './app/App';
import {store} from './app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root not found');
}
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>  
);

