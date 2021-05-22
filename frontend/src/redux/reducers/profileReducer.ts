import { Maybe } from "../../utils/types";

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

import {
  User,
  initialState as userInitialState,
  Action as UserAction,
  userReducer,
} from "./profileReducers/userReducer";

export interface Profile {
  user: Maybe<User>;
  notifications: Notification[];
  friends: Friend[];
  userDues: UserDue[];
}

export type Action = NotificationAction | FriendAction | UserDueAction | UserAction;

const initialState: Profile = {
  user: userInitialState,
  notifications: messageInitialState,
  friends: friendsInitialState,
  userDues: userDueInitialState,
};

export const profileReducer = (state: Profile = initialState, action: Action): Profile => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return { ...state, notifications: notificationsReducer(state.notifications, action) };
    case "LOAD_FRIENDS":
      return { ...state, friends: friendsReducer(state.friends, action) };
    case "LOAD_DUES":
      return { ...state, userDues: duesReducer(state.userDues, action) };
    case "LOAD_USER":
      return { ...state, user: userReducer(state.user, action) };
    case "SET_BALANCE":
      return { ...state, user: userReducer(state.user, action) };
    default:
      return state;
  }
};
