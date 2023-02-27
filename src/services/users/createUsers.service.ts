import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import { hash } from "bcryptjs";
import { AppError } from "../../errors";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const expectedKeys: string[] = [
    "name",
    "email",
    "password",
    "admin",
    "active",
  ];
  const expectedValues: string[] = [
    "string",
    "string",
    "string",
    "boolean",
    "boolean",
  ];
  const { email, password } = userData;

  const hasExpectedKeys = expectedKeys.every((key) =>
    userData.hasOwnProperty(key)
  );

  if (Object.keys(userData).length > 5) {
    throw new AppError("Expected keys: name, email, password, admin, active");
  }

  if (!hasExpectedKeys) {
    throw new AppError(
      `Missing key: ${expectedKeys
        .filter((key) => !userData.hasOwnProperty(key))
        .join(", ")}`,
      400
    );
  }

  const hasValidValues = Object.entries(userData).every(([key, value]) => {
    const expectedValueType = expectedValues[expectedKeys.indexOf(key)];
    return typeof value === expectedValueType;
  });

  if (!hasValidValues) {
    const wrongTypes = Object.entries(userData)
      .filter(
        ([key, value]) =>
          typeof value !== expectedValues[expectedKeys.indexOf(key)]
      )
      .map(([key]) => key);
    throw new AppError(
      `Invalid type for key(s): ${wrongTypes.join(", ")}`,
      400
    );
  }

  const emailExistsQuery = format(
    `SELECT EXISTS (SELECT 1 FROM users WHERE email = %L)`,
    email
  );
  const emailExistsResult = await client.query(emailExistsQuery);
  const emailExists = emailExistsResult.rows[0].exists;
  
  if (emailExists) {
    throw new AppError("User already exists", 409);
  }

  const hashePass = await hash(password, 5);
  userData.password = hashePass;

  const queryString: string = format(
    `
          INSERT INTO
              users(%I)
          VALUES(%L)
          RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
