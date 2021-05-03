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