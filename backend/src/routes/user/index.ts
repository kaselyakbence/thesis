//Libraries
import express from "express";

//Import routes
import { visitRouter } from "./visit";
import { addFriendRouter } from "./addfriend";

const router = express.Router();

router.use(visitRouter);

router.use(addFriendRouter);

export { router as userRouter };
