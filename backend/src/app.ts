import express from "express";

import morgan from "morgan";

import helmet from "helmet";

//Npm package that renders express thrown errors async
import "express-async-errors";

//Routers
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { profileRouter } from "./routes/profile";
import { eventRouter } from "./routes/events";
import { duesRouter } from "./routes/dues";

//Errors
import { NotFoundError } from "./errors/not-found-error";

//Error handler
import { errorHandler } from "./middlewares/error-handler";

import cors from "cors";

const app = express();

//middlewares
app.use(morgan("tiny"));

app.use(helmet());

//Parse body to json
app.use(express.json());

app.use(cors());

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/profile", profileRouter);

app.use("/events", eventRouter);

app.use("/dues", duesRouter);

//If Router not found
app.all("*", async () => {
  throw new NotFoundError();
});

//Error handler
app.use(errorHandler);

export { app };
