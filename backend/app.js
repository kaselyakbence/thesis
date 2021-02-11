const express = require("express");

//Npm package that renders express thrown errors async
require("express-async-errors");

//Config enviroment files
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("1.0.0");
});

module.exports = app;
