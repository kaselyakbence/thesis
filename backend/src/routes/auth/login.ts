//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares/validate-request";

//Models
import { User } from "../../models/User";

//Errors
import { BadRequestError } from "../../errors/bad-request-error";

//Utilities
import { Password } from "../../utils/password";
import { authorize } from "../../middlewares/authorization-middleware";

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

    const user = await User.findOne({ nick_name });

    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const pwMatch = await Password.compare(user.password, password);

    if (!pwMatch) {
      throw new BadRequestError("Wrong password!");
    }

    const jwt_token = await jwt.sign(
      {
        id: user.id,
        nick_name: user.nick_name,
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({ jwt_token });
  }
);

export { router as loginRouter };