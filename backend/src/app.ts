import express, { Request, Response } from "express";

//Npm package that renders express thrown errors async
import "express-async-errors";

//Config enviroment files
require("dotenv").config();

//Routers
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { profileRouter } from "./routes/profile";

//Errors
import { NotFoundError } from "./errors/not-found-error";

//Error handler
import { errorHandler } from "./middlewares/error-handler";

const app = express();

//Parse body to json
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("1.0.5");
});

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/profile", profileRouter);

//If Router not found
app.all("*", async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

export { app };
