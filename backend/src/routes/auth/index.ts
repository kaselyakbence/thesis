//Libraries
import express from "express";

//Import routes
import { signUpRouter } from "./signup";

const router = express.Router();

router.use(signUpRouter);

export { router as userRouter };
