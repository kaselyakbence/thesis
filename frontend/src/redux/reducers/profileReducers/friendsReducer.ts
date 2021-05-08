export interface Friend {
  nick_name: string;
}

export const initialState: Friend[] = [];

type Load = { type: "LOAD_FRIENDS"; payload: Friend[] };

export type Action = Load;

export const friendsReducer = (state: Friend[], action: Action) => {
  switch (action.type) {
    case "LOAD_FRIENDS":
      return action.payload;
    default:
      return state;
  }
};
