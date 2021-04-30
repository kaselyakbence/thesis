import { store } from "../../store";

export interface LoginData {
  nick_name: string;
  password: string;
}

export const login = async ({
  nick_name,
  password,
}: LoginData): Promise<void> => {
  const body = {
    nick_name,
    password,
  };

  const res = await fetch("http://localhost:11111/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resBody = await res.json();

  if (res.status === 200) {
    store.dispatch({ type: "LOGIN", payload: resBody.jwt_token });
    store.dispatch({ type: "SET_ROUTE", payload: "/" });
  }
  if (res.status === 403) {
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: { severity: "error", desciption: "Wrong email or password" },
    });
  }
};
