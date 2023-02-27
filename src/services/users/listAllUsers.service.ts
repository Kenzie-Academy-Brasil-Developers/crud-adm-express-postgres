import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IAllUsersReturn } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<IAllUsersReturn> => {
  const query: string = format(
    `
    SELECT
    "id","name","email","admin","active"
    FROM
        users;
    `
  );

  const queryResult: QueryResult = await client.query(query);

  return queryResult.rows;
};

export default listUsersService;
