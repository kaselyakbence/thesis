//  import { push } from "connected-react-router";
import { store } from "../../store";

import { makeAuthorizedRequest } from "../../../utils/api";

export interface DueData {
  name: string;
  desc?: string | null;
  nick_name: string;
  items: { name: string; value: number }[];
}

export const addDue = async ({ name, desc, nick_name, items }: DueData): Promise<void> => {
  const body: DueData = {
    name,
    nick_name,
    items: items.map(({ name, value }) => ({ name, value })),
  };

  if (desc) body.desc = desc;

  const res = await makeAuthorizedRequest("/dues/create", "POST", body);

  switch (res.status) {
    case 201:
      store.dispatch({
        type: "ADD_MESSAGE",
        payload: { severity: "success", desciption: "Due added" },
      });

      break;
    case 202:
      store.dispatch({
        type: "ADD_MESSAGE",
        payload: { severity: "warning", desciption: "You are not friends, due requested" },
      });
      break;
  }
};
