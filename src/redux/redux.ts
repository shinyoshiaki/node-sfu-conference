import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import local, { LocalState } from "./local";

const rootReducer = combineReducers({ local });

export default function createStore() {
  const store = reduxCreateStore(rootReducer, applyMiddleware(logger));
  return store;
}

export type ReduxState = { local: LocalState };
