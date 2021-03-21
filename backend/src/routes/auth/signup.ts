//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

//Models
import { User } from "../../models/User";

import { validateRequest } from "../../middlewares/validate-request";

//Errors
import { BadRequestError } from "../../errors/bad-request-error";

//Utils
import { Password } from "../../utils/password";

const router = express.Router();

router.post(
  "/signup",
  [
    body("nick_name")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Nickname must be between 4 and 20 characters "),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
    body("password2")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      nick_name,
      email,
      password,
      password2,
      first_name,
      last_name,
      dob,
    } = req.body;

    const isEmailUnique = await User.findOne({ email });
    const isNickUnique = await User.findOne({ nick_name });

    if (isEmailUnique) {
      throw new BadRequestError("Email is not unique");
    }

    if (isNickUnique) {
      throw new BadRequestError("Nickname is not unique");
    }

    if (password !== password2) {
      throw new BadRequestError("Password not matching");
    }

    const user = User.build({
      nick_name,
      email,
      password,
      first_name,
      last_name,
      dob,
    });
    await user.save();

    res.send(user);
  }
);

export { router as signUpRouter };
