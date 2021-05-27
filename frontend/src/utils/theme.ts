import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontSize: 18,
  },
  palette: {
    text: {
      primary: "#2f3542",
      secondary: "#57606f",
      disabled: "#747d8c",
    },
    primary: {
      //main: "#3742fa",
      main: "#0510d0", //darken by 30
    },
    secondary: {
      main: "#ff4757",
    },
    common: {
      white: "#f1f2f6",
      black: "#2f3542",
    },
    success: {
      //main: "#2ed573",
      main: "#24b761", //darken by 15
    },
    warning: {
      main: "#ffa502",
    },
    error: {
      main: "#ff4757",
    },
  },
});
