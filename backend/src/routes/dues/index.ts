//Libraries
import express from "express";

//Import routes
import { acceptRouter } from "./add_due";

const router = express.Router();

router.use(acceptRouter);

export { router as duesRouter };
