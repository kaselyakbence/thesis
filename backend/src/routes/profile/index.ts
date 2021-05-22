//Libraries
import express from "express";

//Import routes
import { friendRequestsRouter } from "./requests";
import { detailsRouter } from "./details";
import { friendsRouter } from "./friends";
import { duesRouter } from "./dues";

const router = express.Router();

router.use(friendRequestsRouter);

router.use(detailsRouter);

router.use(friendsRouter);

router.use(duesRouter);

export { router as profileRouter };
