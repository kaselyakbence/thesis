//Libraries
import express from "express";

//Import routes
import { friendRequestsRouter } from "./friendRequests";
import { friendsRouter } from "./friends";

const router = express.Router();

router.use(friendRequestsRouter);

router.use(friendsRouter);

export { router as profileRouter };
