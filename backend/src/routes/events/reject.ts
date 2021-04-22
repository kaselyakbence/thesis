//Libraries
import express, { Request, Response } from "express";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { Event } from "../../models/Event";

//Errors
import { BadRequestError } from "../../errors/bad-request-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.get("/:pubId/reject", authorize, async (req: Request, res: Response) => {
  const { pubId } = req.params;

  const event = await Event.findOne({ pubId }).exec();

  if (!event) throw new BadRequestError("Event not found");

  if (event.owner !== req.currentUser?.nick_name) throw new UnauthorizedError();

  await event.reject();

  res.status(200).send({ msg: "Accepted" });
});

export { router as acceptRouter };