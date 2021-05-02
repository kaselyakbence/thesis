import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export const addFriend = async (name: string) => {
  const res = await makeAuthorizedRequest(`/users/${name}/addfriend`, "POST");

  if (res.status === 400) {
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: { severity: "error", desciption: "Invalid user" },
    });
  }

  if (res.status === 201) {
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: { severity: "success", desciption: "Friend request sent" },
    });
  }
};
