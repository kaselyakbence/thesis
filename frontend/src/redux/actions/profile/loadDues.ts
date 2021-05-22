import { store } from "../../store";

import { makeAuthorizedRequest, UserDue } from "../../../utils/api";

export const loadDues = async () => {
  const res = await makeAuthorizedRequest(`/profile/dues`, "GET");

  if (res.status === 200) {
    const dues = (await res.json()) as UserDue[];

    store.dispatch({ type: "LOAD_DUES", payload: dues });

    store.dispatch({
      type: "SET_BALANCE",
      payload: dues.reduce((acc, curr) => curr.balance + acc, 0),
    });
  }
};
