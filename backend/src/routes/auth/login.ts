//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares/validate-request";

//Models
import { User } from "../../models/User";

//Errors
import { ForbiddenError } from "../../errors/forbidden-error";

//Utilities
import { Password } from "../../utils/password";

const router = express.Router();

router.post(
  "/login",
  [
    body("nick_name")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Nickname must be between 4 and 20 characters "),
    body("password").trim().notEmpty().withMessage("Missing password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { nick_name, password } = req.body;

    const user = await User.findOne({ nick_name }).exec();

    if (!user) {
      throw new ForbiddenError("User not found!");
    }

    const pwMatch = await Password.compare(user.password, password);

    if (!pwMatch) {
      throw new ForbiddenError("Wrong password!");
    }

    const jwt_token = jwt.sign(
      {
        id: user.id,
        nick_name: user.nick_name,
      },
      process.env.JWT_KEY ?? ""
    );

    res.status(200).send({ jwt_token });
  }
);

export { router as loginRouter };
