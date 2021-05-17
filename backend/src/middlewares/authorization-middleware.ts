import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import mongoose from "mongoose";

import { UnauthorizedError } from "../errors/unauthorized-error";

interface UserPayload {
  id: mongoose.Types.ObjectId;
  nick_name: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const authorize = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError();

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY ?? "") as UserPayload;

    req.currentUser = payload;
  } catch (e) {
    next();
  }

  next();
};
