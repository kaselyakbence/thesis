import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export const loadUser = async () => {
  const res = await makeAuthorizedRequest(`/profile/details`, "GET");

  if (res.status === 200) {
    const json = await res.json();
    store.dispatch({ type: "LOAD_USER", payload: json });
  }
};
