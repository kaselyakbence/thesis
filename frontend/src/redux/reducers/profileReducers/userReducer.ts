import { Maybe } from "../../../utils/types";

export interface User {
  nick_name: string;
  email: string;
  first_name: Maybe<string>;
  last_name: Maybe<string>;
  balance: number;
}

export const initialState: Maybe<User> = null;

type Load = { type: "LOAD_USER"; payload: User };

export type Action = Load;

export const userReducer = (state: Maybe<User>, action: Action) => {
  switch (action.type) {
    case "LOAD_USER":
      return action.payload;
    default:
      return state;
  }
};
