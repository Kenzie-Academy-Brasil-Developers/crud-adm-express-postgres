import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { IUser } from "../../interfaces/users.interfaces";
import { updateUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userId: number,
  reqBody: any
): Promise<IUser> => {
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
