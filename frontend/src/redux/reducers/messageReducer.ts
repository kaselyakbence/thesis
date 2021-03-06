export interface Message {
  severity: "error" | "warning" | "info" | "success";
  desciption: string;
}

const initialState: Message[] = [];

type Add = { type: "ADD_MESSAGE"; payload: Message };
type Pop = { type: "POP_MESSAGE" };

export type Action = Add | Pop;

export const messageReducer = (state: Message[] = initialState, action: Action): Message[] => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    case "POP_MESSAGE":
      state.shift();
      return [...state];
    default:
      return [...state];
  }
};
