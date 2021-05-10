import { Redirect, Route, RouteProps } from "react-router";

import { store } from "../../redux/store";

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  if (store.getState().jwtToken) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};

export default ProtectedRoute;
