import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export const loadNotifications = async () => {
  const res = await makeAuthorizedRequest(`/profile/requests`, "GET");

  if (res.status === 200) {
    const notifications = await res.json();
    store.dispatch({ type: "LOAD_NOTIFICATIONS", payload: notifications });
  }
};
