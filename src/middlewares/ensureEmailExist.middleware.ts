import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../errors";

const ensureEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  const emailExistsQuery = format(
    `SELECT EXISTS (SELECT 1 FROM users WHERE email = %L)`,
    email
  );

  const emailExistsResult = await client.query(emailExistsQuery);
  const emailExists = emailExistsResult.rows[0].exists;

  if (emailExists) {
    throw new AppError("User already exists", 409);
  }

  return next();
};

export default ensureEmailExistMiddleware;
