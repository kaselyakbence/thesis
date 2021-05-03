import { combineReducers, Reducer, CombinedState } from "redux";

import { History } from "history";

import { connectRouter, RouterState, RouterAction } from "connected-react-router";

//Reducers
import { messageReducer, Message, Action as messageAction } from "./reducers/messageReducer";
import { jwtTokenReducer, Action as jwtAction } from "./reducers/jwtTokenReducer";

export const rootReducer = (
  history: History<unknown>
): Reducer<
  CombinedState<{
    jwtToken: string | null;
    router: RouterState<unknown>;
    messages: Message[];
  }>,
  messageAction | jwtAction | RouterAction
> =>
  combineReducers({
    jwtToken: jwtTokenReducer,
    router: connectRouter(history),
    messages: messageReducer,
  });
