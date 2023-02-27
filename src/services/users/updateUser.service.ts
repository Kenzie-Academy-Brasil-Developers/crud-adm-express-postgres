import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUser } from "../../interfaces/users.interfaces";

const updateUserService = async (
  userId: number,
  reqBody: any
): Promise<IUser> => {
  const updateParams: {
    name?: string;
    email?: string;
    password?: string;
  } = reqBody;

  const updateSet = Object.entries(updateParams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => format(`${key} = %L`, value))
    .join(", ");

  const query = format(
    `
    UPDATE users 
    SET ${updateSet} 
    WHERE id = %L`,
    [userId]
  );

  await client.query(query);

  const user = await client.query(
    format(
      `
    SELECT "id","name","email","admin","active"
    FROM users 
    WHERE id = %L`,
      [userId]
    )
  );

  return user.rows[0];
};

export default updateUserService;
