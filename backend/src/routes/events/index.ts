//Libraries
import express from "express";

//Import routes
import { acceptRouter } from "./accept";

const router = express.Router();

router.use(acceptRouter);

export { router as eventRouter };
