import express, { Request, Response } from "express";

//Npm package that renders express thrown errors async
import "express-async-errors";

//Routers
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { profileRouter } from "./routes/profile";
import { eventRouter } from "./routes/events";

//Errors
import { NotFoundError } from "./errors/not-found-error";

//Error handler
import { errorHandler } from "./middlewares/error-handler";

import cors from "cors";

const app = express();

//Parse body to json
app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(400).send({ version: "1.0.5" });
});

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/profile", profileRouter);

app.use("/events", eventRouter);

//If Router not found
app.all("*", async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

export { app };
