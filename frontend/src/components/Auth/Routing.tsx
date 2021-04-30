import { FC } from "react";

import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { RootState } from "../../redux/store";

const unauthorizedPages = ["/register"];

const Auth: FC = () => {
  const jwt = useSelector<RootState>((state) => state.jwtToken);

  const route = useSelector<RootState>((state) => state.route) as string;

  if (!jwt && !unauthorizedPages.includes(route)) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: route,
        }}
      />
    );
  }
};

export default Auth;
