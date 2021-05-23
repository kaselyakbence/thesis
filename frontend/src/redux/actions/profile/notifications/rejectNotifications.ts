import { store } from "../../../store";

import { makeAuthorizedRequest } from "../../../../utils/api";

import { loadNotifications } from "./loadNotifications";

export const rejectNotification = async (pubId: string) => {
  try {
    const res = await makeAuthorizedRequest(`/events/${pubId}/reject`, "POST");
    console.log("Res:", res);

    loadNotifications();
  } catch (_) {
    store.dispatch({ type: "REMOVE_NOTIFICATION", payload: pubId });
    console.log("Remove notification:", pubId);
  }
};
