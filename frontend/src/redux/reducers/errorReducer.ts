const initialState: string[] = [];

type Action = { type: "RESET_ERRORS"; payload: string };

export const errorReducer = (
  state: string[] = initialState,
  action: Action
): string[] => {
  switch (action.type) {
    case "RESET_ERRORS":
      return [];
    default:
      return [...state];
  }
};
