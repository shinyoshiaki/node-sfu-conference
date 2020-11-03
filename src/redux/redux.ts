import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";

const rootReducer = combineReducers({});

export default function createStore() {
  const store = reduxCreateStore(rootReducer, applyMiddleware(logger));
  return store;
}

export type ReduxState = {};
