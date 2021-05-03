//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

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
    const { query } = req.body;

    const regex = new RegExp(`.*${query}.*`);

    const users = await User.find({ nick_name: regex }).select("nick_name").limit(25).exec();

    res.send(users);
  }
);

export { router as searchRouter };
