//Libraries
import express from "express";

//Import routes
import { addRouter } from "./add_due";
import { detailsRouter } from "./details";

const router = express.Router();

router.use(addRouter);

router.use(detailsRouter);

export { router as duesRouter };
