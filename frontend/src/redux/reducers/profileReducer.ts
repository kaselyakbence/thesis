import {
  Notification,
  initialState as messageInitialState,
  Action as NotificationAction,
  notificationsReducer,
} from "./profileReducers/notificationsReducer";

export interface Profile {
  notifications: Notification[];
}

export type Action = NotificationAction;

const initialState: Profile = {
  notifications: messageInitialState,
};

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return { ...state, notifications: notificationsReducer(state.notifications, action) };
    default:
      return state;
  }
};
