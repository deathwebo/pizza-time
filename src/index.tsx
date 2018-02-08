import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { 
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';
import { StoreState } from './types';
import { fetchAvailablePizzaSizes } from './actions';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// tslint:disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<StoreState>(
  appReducer, 
  {
    availablePizzaSizes: [],
    cart: [],
    currentPizza: null,
    isLoading: false,
  },
  composeEnhancers(applyMiddleware(thunk)),
);

// tslint:disable-next-line
store.dispatch(fetchAvailablePizzaSizes());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
