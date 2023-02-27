import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 403);
  }

  token = token.split(" ")[1];

  jwt.verify(token, "secret", (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      admin: decoded.admin,
      isActive: decoded.isActive,
      mail: decoded.mail,
      sub: parseInt(decoded.sub)
    }

    return next();
  });
};

export default ensureTokenIsValidMiddleware;
