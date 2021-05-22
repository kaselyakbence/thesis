//Libraries
import express from "express";

//Import routes
import { acceptRouter } from "./accept";
import { rejectRouter } from "./reject";

const router = express.Router();

router.use(acceptRouter);

router.use(rejectRouter);

export { router as eventRouter };
