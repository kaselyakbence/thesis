//Configure enviroment
import dotenv from "dotenv";
dotenv.config();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./style/index.css";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
