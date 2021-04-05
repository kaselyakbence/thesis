//Libraries
import express from "express";

//Import routes
import { visitRouter } from "./visit";

const router = express.Router();

router.use(visitRouter);

export { router as userRouter };
