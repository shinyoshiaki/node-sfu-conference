import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import local, { LocalState } from "./local";
import remote, { RemoteState } from "./remote";

const rootReducer = combineReducers({ local, remote });

export default function createStore() {
  const store = reduxCreateStore(rootReducer, applyMiddleware(logger));
  return store;
}

export type ReduxState = { local: LocalState; remote: RemoteState };
