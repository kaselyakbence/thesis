export interface UserDue {
  pubId: string;
  name: string;
  balance: number;
  from: string;
}

export const initialState: UserDue[] = [];

type Load = { type: "LOAD_DUES"; payload: UserDue[] };

export type Action = Load;

export const duesReducer = (state: UserDue[], action: Action) => {
  switch (action.type) {
    case "LOAD_DUES":
      return action.payload;
    default:
      return state;
  }
};
