//Libraries
import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";
import { Event } from "../../models/Event";

import { Types } from "mongoose";

//Error
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.post("/:nick_name/addfriend", authorize, async (req: Request, res: Response) => {
  const { nick_name } = req.params;

  const user = await User.findOne({ nick_name }).exec();

  if (!req.currentUser) throw new UnauthorizedError();

  if (!user) throw new BadRequestError("User not found");

  try {
    const event = Event.buildFriendRequest(new Types.ObjectId(req.currentUser?.id), user.id);

    event.save();

    res.status(201).send({ msg: "Created" });
  } catch (e) {
    throw new BadRequestError("Request was not sent");
  }
});

export { router as addFriendRouter };
