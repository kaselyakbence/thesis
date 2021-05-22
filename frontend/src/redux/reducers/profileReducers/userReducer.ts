import { Maybe } from "../../../utils/types";

export interface User {
  nick_name?: Maybe<string>;
  email?: Maybe<string>;
  first_name?: Maybe<string>;
  last_name?: Maybe<string>;
  balance?: Maybe<number>;
}

export const initialState: Maybe<User> = {};

type Load = { type: "LOAD_USER"; payload: User } | { type: "SET_BALANCE"; payload: number };

export type Action = Load;

export const userReducer = (state: Maybe<User> = initialState, action: Action): Maybe<User> => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, ...action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    default:
      return { ...state };
  }
};
