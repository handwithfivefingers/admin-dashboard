import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares)];
const store = createStore(rootReducer, composeEnhancers(...enhancers));

// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
