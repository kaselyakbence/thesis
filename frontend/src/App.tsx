import { FC } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import ProtectedRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";

import { Switch } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import { store, history } from "./redux/store";

import "./style/app.css";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Friends from "./pages/Friends";

const theme = createMuiTheme();

const App: FC = () => {
  return (
    <div id="app">
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
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
              <ProtectedRoute path="/">
                <Home />
              </ProtectedRoute>
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
