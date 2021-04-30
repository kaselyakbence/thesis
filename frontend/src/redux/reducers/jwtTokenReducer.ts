type ActionTypes = "LOGIN" | "LOGOUT";

const initialState: string | null = null;

type Action = { type: ActionTypes; payload: string };

export const jwtTokenReducer = (
  state: string | null = initialState,
  action: Action
): string | null => {
  switch (action.type) {
    case "LOGOUT":
      return null;
    case "LOGIN":
      return action.payload;
    default:
      return state;
  }
};
