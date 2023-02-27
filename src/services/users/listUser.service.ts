import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const listUserService = async (userId: number): Promise<IUserWithoutPassword> => {
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

  const user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0])

  return user;
};

export default listUserService;
