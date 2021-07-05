import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { persistedReducer } from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleWares)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
