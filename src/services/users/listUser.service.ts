import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IAllUsersReturn, IUserWithoutPassword } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<IAllUsersReturn> => {
  const query: string = format(
    `
    SELECT
       *
    FROM
        users;
    `
  );

  const queryResult: QueryResult = await client.query(query);

  const users: IAllUsersReturn = queryResult.rows;

  return users;
};

export default listUsersService;
