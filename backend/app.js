const express = require("express");

//Npm package that renders express thrown errors async
require("express-async-errors");

//Config enviroment files
require("dotenv").config();

//Routers
const userRouter = require("./routes/auth");

//Errors
const NotFoundError = require("./errors/not-found-error");

//Error handler
const errorHandler = require("./middlewares/error-handler");

const app = express();

//Parse body to json
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("1.0.2");
});

app.use("/user", userRouter);

//If Router not found
app.all("*", async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

module.exports = app;
