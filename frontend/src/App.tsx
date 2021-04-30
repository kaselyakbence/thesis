import { FC } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import { store } from "./redux/store";

import Auth from "./components/Auth/Routing";

import "./style/app.css";

//Pages
import Login from "./pages/Login";

const theme = createMuiTheme();

const App: FC = () => {
  return (
    <div id="app">
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Auth />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <p>Home</p>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
