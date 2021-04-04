import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../errors/unauthorized-error";

interface UserPayload {
  id: number;
  nick_name: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError();

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    req.currentUser = payload;
  } catch (e) {}

  next();
};
