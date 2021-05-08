import {
  Notification,
  initialState as messageInitialState,
  Action as NotificationAction,
  notificationsReducer,
} from "./profileReducers/notificationsReducer";

import {
  Friend,
  initialState as friendsInitialState,
  Action as FriendAction,
  friendsReducer,
} from "./profileReducers/friendsReducer";

export interface Profile {
  notifications: Notification[];
  friends: Friend[];
}

export type Action = NotificationAction | FriendAction;

const initialState: Profile = {
  notifications: messageInitialState,
  friends: friendsInitialState,
};

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return { ...state, notifications: notificationsReducer(state.notifications, action) };
    case "LOAD_FRIENDS":
      return { ...state, friends: friendsReducer(state.friends, action) };
    default:
      return state;
  }
};
