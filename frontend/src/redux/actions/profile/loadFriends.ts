import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export const loadFriends = async () => {
  const res = await makeAuthorizedRequest(`/profile/friends`, "GET");

  if (res.status === 200) {
    const friends = await res.json();
    store.dispatch({ type: "LOAD_FRIENDS", payload: friends });
  }
};
