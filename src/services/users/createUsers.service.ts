import {
  IUserRequest,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserSchema, returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const validatedData = createUserSchema.parse(userData);

  const queryString: string = format(
    `
          INSERT INTO
              users(%I)
          VALUES(%L)
          RETURNING *;
      `,
    Object.keys(validatedData),
    Object.values(validatedData)
  );

  const queryResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0])
  
  return newUser;
};
export default createUsersService;
