//Libraries
import express, { Request, Response } from "express";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { Event, EventDoc } from "../../models/Event";

//Errors
import { BadRequestError } from "../../errors/bad-request-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.post("/:pubId/reject", authorize, async (req: Request, res: Response) => {
  const { pubId } = req.params;

  const event = (await Event.findOne({ pubId }).exec()) as EventDoc;

  if (!event) throw new BadRequestError("Event not found");

  if (event.to?.toString() !== req.currentUser?.id) throw new UnauthorizedError();

  await event.reject();

  res.status(200).send({ msg: "Accepted" });
});

export { router as rejectRouter };
