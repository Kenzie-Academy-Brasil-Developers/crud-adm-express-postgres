import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";

const listUserService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
    
  const query: string = format(
    `
    SELECT
        *
    FROM
        users
    WHERE
        id = ${userId};
    `
  );

  const queryResult: QueryResult = await client.query(query);

  return queryResult.rows[0];
};

export default listUserService;
