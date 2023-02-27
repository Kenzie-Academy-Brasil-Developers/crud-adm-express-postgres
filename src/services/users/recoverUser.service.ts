import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUser } from "../../interfaces/users.interfaces";

const recoverUserService = async (userId: number): Promise<IUser> => {
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
    "id","name","email","admin","active"
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

export default recoverUserService;
