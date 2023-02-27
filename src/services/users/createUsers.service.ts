import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserSchema, returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import { hash, hashSync } from "bcryptjs";
import { AppError } from "../../errors";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        const message = `Invalid value: ${error.message.replace(/\\/g, "")}`;
        throw new AppError(message, 400);
      }
      throw new AppError(error.message, 400);
    }
    throw new AppError("Invalid request body", 400);
  }
};
export default createUsersService;
