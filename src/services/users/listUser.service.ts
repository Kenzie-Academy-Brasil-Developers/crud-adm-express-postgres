import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<IUserWithoutPassword[]> => {
  const query: string = format(
    `
    SELECT
        id, id, name, email, admin, active
    FROM
        users;
    `
  );

  const queryResult: QueryResult = await client.query(query);

  const users: IUserWithoutPassword[] = queryResult.rows;

  return users;
};

export default listUsersService;
