//Libraries
import express from "express";

//Import routes
import { signUpRouter } from "./register";
import { loginRouter } from "./login";

const router = express.Router();

router.use(signUpRouter);

router.use(loginRouter);

export { router as userRouter };
