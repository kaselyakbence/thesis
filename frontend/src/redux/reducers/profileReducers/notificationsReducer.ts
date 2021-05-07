export type EventType = "FRIEND_REQUEST" | "PARTICIPATION_REQUEST";

export interface Notification {
  pubId: string;
  type: EventType;
  from: string;
  payload?: string;
}

export const initialState: Notification[] = [];

type Load = { type: "LOAD_NOTIFICATIONS"; payload: Notification[] };

export type Action = Load;

export const notificationsReducer = (state: Notification[], action: Action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return action.payload;
    default:
      return state;
  }
};
