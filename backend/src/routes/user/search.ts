//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

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
  ],
  authorize,
  async (req: Request, res: Response) => {
    //TODO If requested exclude friend and maybe those who already requested to be friends

    if (!req.currentUser) throw new UnauthorizedError();

    const { query } = req.body;

    const regex = new RegExp(`.*${query}.*`);

    const users = await User.find({ nick_name: regex }).select("nick_name").limit(25).exec();

    const excludedUsers = users.filter((user) => user.nick_name !== req.currentUser?.nick_name);

    res.send(excludedUsers);
  }
);

export { router as searchRouter };
