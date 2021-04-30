import { combineReducers, Reducer, CombinedState, AnyAction } from "redux";

import { History } from "history";

import { connectRouter, RouterState } from "connected-react-router";

//Reducers
import { messageReducer, Message } from "./reducers/messageReducer";
import { jwtTokenReducer } from "./reducers/jwtTokenReducer";

export const rootReducer = (
  history: History<unknown>
): Reducer<
  CombinedState<{
    jwtToken: string | null;
    router: RouterState<unknown>;
    messages: Message[];
  }>,
  AnyAction
> =>
  combineReducers({
    jwtToken: jwtTokenReducer,
    router: connectRouter(history),
    messages: messageReducer,
  });
