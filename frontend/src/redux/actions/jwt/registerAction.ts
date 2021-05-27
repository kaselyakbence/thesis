import { push } from "connected-react-router";
import { store } from "../../store";

export interface RegisterData {
  nick_name: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export const register = async ({
  nick_name,
  email,
  first_name,
  last_name,
  password,
  password2,
}: RegisterData): Promise<void> => {
  const body = {
    nick_name,
    email,
    first_name,
    last_name,
    password,
    password2,
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URL ?? "http://localhost:11111"}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const resBody = await res.json();

  if (res.status === 422) {
    resBody.errors.forEach(({ message }: { message: string }) => {
      store.dispatch({ type: "ADD_MESSAGE", payload: { severity: "error", desciption: message } });
    });
  }

  if (res.status === 201) {
    store.dispatch(push("/login"));
    store.dispatch({
      type: "ADD_MESSAGE",
      payload: {
        severity: "success",
        desciption: "Successfully registered. Please log in!",
      },
    });
  }
};
