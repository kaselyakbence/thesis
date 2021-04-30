const initialState = "/";

type Action = { type: "SET_ROUTE"; payload: string };

export const routeReducer = (
  state: string = initialState,
  action: Action
): string => {
  switch (action.type) {
    case "SET_ROUTE":
      return action.payload;
    default:
      return state;
  }
};
