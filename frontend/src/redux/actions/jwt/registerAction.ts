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

type Error = {
  nick_name?: string;
  email?: string;
  password?: string;
  password2?: string;
};

export const register = async ({
  nick_name,
  email,
  first_name,
  last_name,
  password,
  password2,
}: RegisterData): Promise<Error> => {
  if (password !== password2) {
    return {
      password: "Passwords aren't matching",
      password2: "Passwords aren't matching",
    };
  }

  const body = {
    nick_name,
    email,
    first_name,
    last_name,
    password,
    password2,
  };

  const res = await fetch("http://localhost:11111/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resBody = await res.json();

  if (res.status === 422) {
    return resBody.map(({ field, message }: { field: string; message: string }) => {
      const error: any = {};
      error[field] = message;
      return error;
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

  return {};
};
