//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User, UserDoc } from "../../models/User";

//Errors
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.post(
  "/search",
  [
    body("query")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Nickname must be between 4 and 20 characters "),
    body("no_friends").isBoolean().withMessage("no_friends must be a boolean"),
  ],
  authorize,
  async (req: Request, res: Response) => {
    if (!req.currentUser) throw new UnauthorizedError();

    const { query, no_friends } = req.body;

    const regex = new RegExp(`.*${query}.*`);

    const users = await User.find({ nick_name: regex }).select("nick_name").limit(15).exec();

    let excludedUsers = users.filter((user) => user.nick_name !== req.currentUser?.nick_name);

    if (no_friends) {
      const user = (await User.findById(req.currentUser.id)) as UserDoc;
      const friends = (await user.getFriends()).friends;
      excludedUsers = excludedUsers.filter(
        (user) => !friends.some((friend) => user.nick_name === friend.nick_name)
      );
    }

    res.send(excludedUsers);
  }
);

export { router as searchRouter };
