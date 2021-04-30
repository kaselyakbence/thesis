import { combineReducers } from "redux";

//Reducers
import { messageReducer } from "./reducers/messageReducer";
import { jwtTokenReducer } from "./reducers/jwtTokenReducer";
import { routeReducer } from "./reducers/routeReducer";

export const rootReducer = combineReducers({
  jwtToken: jwtTokenReducer,
  route: routeReducer,
  messages: messageReducer,
});
