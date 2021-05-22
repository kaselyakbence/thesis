//Libraries
import express, { Request, Response } from "express";

//Errors
import { NotFoundError } from "../../errors/not-found-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

const router = express.Router();

router.get("/details", authorize, async (req: Request, res: Response) => {
  if (!req.currentUser?.id) throw new UnauthorizedError();

  const user = await User.findById(req.currentUser.id)
    .select("nick_name email first_name last_name")
    .exec();

  if (!user) throw new NotFoundError();
  res.send(user);
});

export { router as detailsRouter };
