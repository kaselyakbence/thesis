//Libraries
import express, { Request, Response } from "express";

import { body } from "express-validator";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";
import { validateRequest } from "../../middlewares/validate-request";

//Models
import { User, UserDoc } from "../../models/User";

//Errors
import { InternalServerError } from "../../errors/internal-server-error";
import { NotFoundError } from "../../errors/not-found-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

const router = express.Router();

router.put(
  "/public/change",
  authorize,
  [
    body("is_public")
      .exists()
      .withMessage("is_public is required")
      .isBoolean()
      .withMessage("is_public must be a boolean"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { is_public } = req.body;

    if (!req.currentUser) throw new UnauthorizedError();

    const user = (await User.findOne({ nick_name: req.currentUser.nick_name }).exec()) as UserDoc;

    if (!user) throw new NotFoundError();

    try {
      await user.setPublic(is_public);

      res.status(200).send({ msg: "Updated succesfully" });
    } catch (e) {
      throw new InternalServerError("Updating status failed due to server error");
    }
  }
);

export { router as changePublicRouter };
