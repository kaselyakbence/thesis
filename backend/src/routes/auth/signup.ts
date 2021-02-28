//Libraries
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

//Models
import { User } from "../../models/User";

import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

router.post(
  "/signup",
  [
    body("nick_name")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { nick_name, email, password } = req.body;

    let user = new User({ nick_name, email, password });

    res.send(user);
  }
);

export { router as signUpRouter };
