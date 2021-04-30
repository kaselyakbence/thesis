import { FC } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import { ProtectedRoute } from "./components/auth/PrivateRoute";

import { Switch, Route } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import { store, history } from "./redux/store";

import "./style/app.css";

import dotenv from "dotenv";
dotenv.config();

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = createMuiTheme();

const App: FC = () => {
  return (
    <div id="app">
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <ProtectedRoute path="/">
                <p>page</p>
              </ProtectedRoute>
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
