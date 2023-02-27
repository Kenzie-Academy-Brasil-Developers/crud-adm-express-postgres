import {
  IUserRequest,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserSchema } from "../../schemas/users.schemas";
import { hashSync } from "bcryptjs";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const validatedData = createUserSchema.parse(userData);

  const hashePass = hashSync(validatedData.password, 10);
  validatedData.password = hashePass;

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

  const newUser = queryResult.rows[0];
  delete newUser.password;

  return newUser;
};
export default createUsersService;
