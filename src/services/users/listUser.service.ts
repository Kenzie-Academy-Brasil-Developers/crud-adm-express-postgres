import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUser } from "../../interfaces/users.interfaces";

const listUserService = async (userId: number): Promise<IUser> => {
  const query: string = format(
    `
    SELECT
       *
    FROM
        users
    WHERE 
        users.id = ${userId};
    `
  );

  const queryResult: QueryResult = await client.query(query);

  const user: IUser = queryResult.rows[0];

  return user;
};

export default listUserService;
