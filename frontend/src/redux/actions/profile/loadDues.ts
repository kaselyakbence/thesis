import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export const loadDues = async () => {
  const res = await makeAuthorizedRequest(`/profile/dues`, "GET");

  if (res.status === 200) {
    const dues = await res.json();

    store.dispatch({ type: "LOAD_DUES", payload: dues });
  }
};
