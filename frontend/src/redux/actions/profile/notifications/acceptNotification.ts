import { store } from "../../../store";

import { makeAuthorizedRequest } from "../../../../utils/api";
import { EventType } from "../../../reducers/profileReducers/notificationsReducer";

import { loadNotifications } from "./loadNotifications";
import { loadFriends } from "../loadFriends";
import { loadDues } from "../loadDues";

export const acceptNotification = async (pubId: string, event?: EventType) => {
  try {
    await makeAuthorizedRequest(`/events/${pubId}/accept`, "POST");
    loadNotifications();
    switch (event) {
      case "FRIEND_REQUEST":
        loadFriends();
        break;
      case "LENT_REQUEST":
        loadDues();
        break;
    }
  } catch (_) {
    store.dispatch({ type: "REMOVE_NOTIFICATION", payload: pubId });
  }
};
