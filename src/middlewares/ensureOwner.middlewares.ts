import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "express-async-errors";

const ensureOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const auth = req.user;

  if (!auth.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureOwnerMiddleware;
