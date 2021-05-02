//Libraries
import express from "express";

//Import routes
import { visitRouter } from "./visit";
import { addFriendRouter } from "./addfriend";
import { searchRouter } from "./search";

const router = express.Router();

router.use(visitRouter);

router.use(addFriendRouter);

router.use(searchRouter);

export { router as userRouter };
