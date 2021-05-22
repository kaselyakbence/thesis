//Libraries
import express, { Request, Response } from "express";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { Due, DueDoc } from "../../models/Due";

//Errors

import { NotFoundError } from "../../errors/not-found-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.get("/:pubId/details", authorize, async (req: Request, res: Response) => {
  const { pubId } = req.params;

  const due = (await Due.findOne({ pubId }).exec()) as DueDoc;

  if (!due) throw new NotFoundError();

  if (req.currentUser?.nick_name !== due.owner && req.currentUser?.nick_name !== due.receiver) {
    throw new UnauthorizedError();
  }
  return res.status(200).send(due);
});

export { router as detailsRouter };
