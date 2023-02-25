import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { AppError } from '../errors'

const ensureUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = parseInt(req.params.id);

  const queryStringUserExists: string = format(`
        SELECT
            *
        FROM
            users
        WHERE
            id = ${userId};
    `);

  const queryResult: QueryResult = await client.query(queryStringUserExists);

  if (queryResult.rowCount === 0) {
    throw new AppError('User not found', 404)
  }

  return next();
};

export default ensureUserExistMiddleware;
