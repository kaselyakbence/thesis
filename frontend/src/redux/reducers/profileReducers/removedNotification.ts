export interface RemowedNotification {
  pubId: string;
}

export const initialState: RemowedNotification[] = [];

type Load = { type: "RESET_REMOWED" } | { type: "REMOVE_NOTIFICATION"; payload: string };

export type Action = Load;

export const remowedNotificationsReducer = (state: RemowedNotification[], action: Action) => {
  switch (action.type) {
    case "RESET_REMOWED":
      return [];
    case "REMOVE_NOTIFICATION":
      return [...state, { pubId: action.payload }];
    default:
      return state;
  }
};
