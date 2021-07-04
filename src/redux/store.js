import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistedReducer } from './root-reducer';

const middleWares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleWares)
);

export const persistor = persistStore(store);
