//Libraries
import express, { Request, Response } from "express";

import { body } from "express-validator";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";
import { validateRequest } from "../../middlewares/validate-request";

//Models
import { Due } from "../../models/Due";
import { Event } from "../../models/Event";
import { User, UserDoc } from "../../models/User";

//Errors
import { BadRequestError } from "../../errors/bad-request-error";
import { InternalServerError } from "../../errors/internal-server-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.post(
  "/create",
  authorize,
  [
    body("name")
      .trim()
      .exists()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters "),
    body("desc")
      .trim()
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("Description must be between 2 and 50 characters "),
    body("nick_name")
      .trim()
      .exists()
      .withMessage("nick_name is required")
      .isLength({ min: 4, max: 20 })
      .withMessage("A nick_name must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { nick_name, name, desc, items } = req.body;

    if (!req.currentUser) throw new UnauthorizedError();

    const user = (await User.findOne({ nick_name }).exec()) as UserDoc;

    if (!user) throw new BadRequestError("User not found");

    try {
      const { friends } = await user.getFriends();

      const due = Due.build({
        name,
        desc,
        items,
        owner: req.currentUser?.nick_name,
        receiver: user.nick_name,
      });

      await due.save();

      if (friends.some((friend) => friend.nick_name === nick_name)) {
        await due.activate();
        res.status(201).send({ msg: "Due created" });
      } else {
        const lent = Event.buildLendRequest(due.id, req.currentUser?.id, user.id, due.pubId);
        await lent.save();

        res.status(202).send({ msg: "Due requested" });
      }
    } catch (e) {
      throw new InternalServerError("Due not saved");
    }
  }
);

export { router as addRouter };
