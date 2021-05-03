import { store } from "../../store";
import { push } from "connected-react-router";

export const logout = async (): Promise<void> => {
  store.dispatch({ type: "LOGOUT" });
  store.dispatch(push("/login"));
  store.dispatch({
    type: "ADD_MESSAGE",
    payload: { severity: "info", desciption: "Succesfully logged out..." },
  });
};
