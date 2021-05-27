import { store } from "../../../store";

import { makeAuthorizedRequest } from "../../../../utils/api";

import { loadNotifications } from "./loadNotifications";

export const rejectNotification = async (pubId: string) => {
  try {
    await makeAuthorizedRequest(`/events/${pubId}/reject`, "POST");

    loadNotifications();
  } catch (_) {
    store.dispatch({ type: "REMOVE_NOTIFICATION", payload: pubId });
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: {
        severity: "warning",
        desciption: "You are offline. Notification will be rejected next time you go online",
      },
    });
  }
};
