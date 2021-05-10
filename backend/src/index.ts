//Config enviroment files
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connect } from "./db/connectToDB";

import { populate } from "./db/populate";

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

  //Populate in development
  if ((process.env.APP_ENV ?? "development") === "development") {
    populate();
  }

  console.log(`App listening at http://localhost:${port}`);
});
