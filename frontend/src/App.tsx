import { FC, lazy, Suspense } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import ProtectedRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";

import { Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";

import { store, history } from "./redux/store";

import { theme } from "./utils/theme";

import "./style/app.css";

//Pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Friends = lazy(() => import("./pages/Friends"));
const Dues = lazy(() => import("./pages/Dues"));
const Profile = lazy(() => import("./pages/Profile"));

const App: FC = () => {
  return (
    <div id="app">
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <PublicRoute path="/login">
                  <Login />
                </PublicRoute>
                <PublicRoute path="/register">
                  <Register />
                </PublicRoute>
                <ProtectedRoute path="/friends">
                  <Friends />
                </ProtectedRoute>
                <ProtectedRoute path="/dues">
                  <Dues />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/">
                  <Home />
                </ProtectedRoute>
              </Switch>
            </Suspense>
          </ConnectedRouter>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
