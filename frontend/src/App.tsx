import { FC } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import { store } from "./redux/store";

const theme = createMuiTheme();

const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/">
              <p>Home</p>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
