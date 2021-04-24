import React, { FC } from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme();

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>React App</p>
      </div>
    </ThemeProvider>
  );
};

export default App;
