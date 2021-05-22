import { store } from "../../store";
import { push } from "connected-react-router";

export interface LoginData {
  nick_name: string;
  password: string;
}

export const login = async ({ nick_name, password }: LoginData): Promise<void> => {
  const body = {
    nick_name,
    password,
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URL ?? "http://localhost:11111"}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const resBody = await res.json();

  if (res.status === 200) {
    store.dispatch({ type: "LOGIN", payload: resBody.jwt_token });
    localStorage.setItem("jwt_key", resBody.jwt_token);
    store.dispatch(push("/"));
  }
  if (res.status === 403) {
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: { severity: "error", desciption: "Wrong username or password" },
    });
  }
  if (res.status === 500) {
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: { severity: "error", desciption: "Something went wrong" },
    });
  }
};
