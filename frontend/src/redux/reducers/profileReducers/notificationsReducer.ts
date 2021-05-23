export type EventType = "FRIEND_REQUEST" | "PARTICIPATION_REQUEST" | "LENT_REQUEST";

export interface Notification {
  pubId: string;
  type: EventType;
  from: string;
  payload?: string;
}

export const initialState: Notification[] = [];

type Load =
  | { type: "LOAD_NOTIFICATIONS"; payload: Notification[] }
  | { type: "REMOVE_NOTIFICATION"; payload: string };

export type Action = Load;

export const notificationsReducer = (state: Notification[], action: Action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      console.log("PubId:", action.payload);

      return [...state.filter((notification) => notification.pubId !== action.payload)];
    default:
      return state;
  }
};
