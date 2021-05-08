//Configure enviroment
import dotenv from "dotenv";
dotenv.config();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./style/index.css";

console.log(process.env.REACT_APP_API_URL);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
