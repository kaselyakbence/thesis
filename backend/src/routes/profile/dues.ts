//Libraries
import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnauthorizedError } from "../../errors/unauthorized-error";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

const router = express.Router();

router.get("/dues", authorize, async (req: Request, res: Response) => {
  if (!req.currentUser?.id) throw new UnauthorizedError();

  const user = await User.findById(req.currentUser.id).exec();

  if (!user) throw new BadRequestError("User not found");

  const dues = await user.getDues();

  return res.send(
    dues.dues.map((due: any) => ({
      pubId: due.pubId,
      name: due.name,
      from: due.from,
      balance: due.balance,
    }))
  );
});

export { router as duesRouter };
