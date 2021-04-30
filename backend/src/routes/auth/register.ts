//Libraries
import express, { Request, Response } from "express";
import { body } from "express-validator";

//Models
import { User } from "../../models/User";

//Middlewares
import { validateRequest } from "../../middlewares/validate-request";

//Errors
import { UnprocessableError } from "../../errors/unprocessable-error";

const router = express.Router();

router.post(
  "/register",
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
    const { nick_name, email, password, password2, first_name, last_name, is_public } = req.body;

    const isEmailUnique = await User.findOne({ email }).exec();
    const isNickUnique = await User.findOne({ nick_name }).exec();

    const errors: {
      field: string;
      message: string;
    }[] = [];

    if (isEmailUnique) {
      errors.push({ field: "email", message: "Email must be unique" });
    }

    if (isNickUnique) {
      errors.push({ field: "nick_name", message: "Username must be unique" });
    }

    if (password !== password2) {
      errors.push({ field: "password", message: "Passwords aren't matching" });
    }

    if (errors.length > 0) {
      throw new UnprocessableError(errors);
    }

    const user = User.build({
      nick_name,
      email,
      password,
      first_name,
      last_name,
      is_public,
    });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
