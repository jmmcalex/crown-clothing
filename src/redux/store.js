import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import { persistedReducer } from "./root-reducer";

const middleWares = [logger];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleWares)
);

export const persistor = persistStore(store);
