import { combineReducers } from "redux";

//Reducers
import { errorReducer } from "./reducers/errorReducer";
import { jwtTokenReducer } from "./reducers/jwtTokenReducer";
import { routeReducer } from "./reducers/routeReducer";

export const rootReducer = combineReducers({
  jwtToken: jwtTokenReducer,
  route: routeReducer,
  errors: errorReducer,
});
