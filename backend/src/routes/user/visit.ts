//Libraries
import express, { Request, Response } from "express";

//Middlewares
import { authorize } from "../../middlewares/authorization-middleware";

//Models
import { User } from "../../models/User";

const router = express.Router();

router.get(
  "/:nick_name/visit",
  authorize,
  async (req: Request, res: Response) => {
    const { nick_name } = req.params;

    const user = await User.findOne({ nick_name }).exec();

    if (!user) return res.status(204).send({});

    const publicData = await user.visit();

    res.send(publicData);
  }
);

export { router as visitRouter };
