import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const recoverUserService = async (userId: number): Promise<IUserWithoutPassword> => {
  const queryString: string = `
    UPDATE
        users
    SET
        "active" = true
    WHERE
        id = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);

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

export default recoverUserService;
