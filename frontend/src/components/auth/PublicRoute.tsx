import { Redirect, Route, RouteProps } from "react-router";

import { store } from "../../redux/store";

const PublicRoute = (routeProps: RouteProps): JSX.Element => {
  if (store.getState().jwtToken) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <Route {...routeProps} />;
  }
};

export default PublicRoute;
