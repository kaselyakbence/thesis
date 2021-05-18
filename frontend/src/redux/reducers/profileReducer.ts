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

import {
  UserDue,
  initialState as userDueInitialState,
  Action as UserDueAction,
  duesReducer,
} from "./profileReducers/userDuesReducer";

export interface Profile {
  notifications: Notification[];
  friends: Friend[];
  userDues: UserDue[];
}

export type Action = NotificationAction | FriendAction | UserDueAction;

const initialState: Profile = {
  notifications: messageInitialState,
  friends: friendsInitialState,
  userDues: userDueInitialState,
};

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return { ...state, notifications: notificationsReducer(state.notifications, action) };
    case "LOAD_FRIENDS":
      return { ...state, friends: friendsReducer(state.friends, action) };
    case "LOAD_DUES":
      return { ...state, userDues: duesReducer(state.userDues, action) };
    default:
      return state;
  }
};
