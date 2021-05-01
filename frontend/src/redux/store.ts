import { createStore, applyMiddleware } from "redux";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./rootReducer";

export const history = createBrowserHistory();

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);

export type RootState = ReturnType<typeof store.getState>;
