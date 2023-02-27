import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword, updateUserSchema } from "../../schemas/users.schemas";
import "express-async-errors";

const updateUserService = async (
  userId: number,
  reqBody: any
): Promise<IUserWithoutPassword> => {
  if (Object.keys(reqBody).length === 0) {
    throw new AppError("Expected keys: name, email, password");
  }

  const updateParams = updateUserSchema.parse(reqBody);

  const updateSet = Object.entries(updateParams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => format(`${key} = %L`, value))
    .join(", ");

  let query;

  if (Object.keys(reqBody).length === 1) {
    const [key, value] = Object.entries(updateParams)[0];
    query = format(
      `
        UPDATE users 
        SET ${format(`${key} = %L`, value)} 
        WHERE id = %L`,
      [userId]
    );
  } else {
    query = format(
      `
        UPDATE users 
        SET ${updateSet} 
        WHERE id = %L`,
      [userId]
    );
  }

  await client.query(query);

  const queryResult = await client.query(
    format(
      `
        SELECT *
        FROM users 
        WHERE id = %L`,
      [userId]
    )
  );
  const user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0])
  return user;
};

export default updateUserService;
