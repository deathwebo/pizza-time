import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { appReducer } from './reducers';
import { StoreState } from './types';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore<StoreState>(
  appReducer, 
  {
    availablePizzaSizes: [],
    cart: [],
    currentPizza: null,
  },
  // tslint:disable-next-line
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
