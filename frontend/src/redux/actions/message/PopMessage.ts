import { store } from "../../store";

export const popMessage = (): void => {
  store.dispatch({ type: "POP_MESSAGE" });
};
