import { store } from "../redux/store";

const apiUrl = process.env.REACT_APP_API_URL ?? "http://localhost:11111";

export const makeAuthorizedRequest = async (
  url: string,
  method: string,
  body?: any
): Promise<Response> => {
  const token = store.getState().jwtToken;
  return fetch(`${apiUrl}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
};

//Types
interface PublicVisitedUser {
  nick_name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  friends: { nick_name: string }[];

  is_public: true;
}

interface PrivateVisitedUser {
  nick_name: string;
  email: string;

  is_public: false;
}

export type VisitedUser = PublicVisitedUser | PrivateVisitedUser;

export interface VisitedDue {
  pubId: string;
  name: string;
  desc: string;
  created_at: string;
  owner: string;
  receiver: string;
  items: { name: string; value: number }[];
}
