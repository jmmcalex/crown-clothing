import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import { persistedReducer } from './root-reducer';

const middleWares = [];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleWares)
);

export const persistor = persistStore(store);
