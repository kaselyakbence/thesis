//Libraries
import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

const router = express.Router();

router.get("/requests", authorize, async (req: Request, res: Response) => {
  if (!req.currentUser?.id) throw new UnauthorizedError();

  const user = await User.findById(req.currentUser.id).exec();

  if (!user) throw new BadRequestError("User not found");

  try {
    const userRequests = await user.getRequests();
    return res.send(userRequests.events);
  } catch (e) {
    return res.status(203).send([]);
  }
});

export { router as friendRequestsRouter };
