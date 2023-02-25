import {
  IUserRequest, IUserResult, IUserWithoutPassword
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
 
  // const queryUserExist: string = `
  //     SELECT
  //         *
  //     FROM
  //         users
  //     WHERE
  //         email = ${userData.email};
  // `;

  // const queryResultUserExists: QueryResult = await client.query(queryUserExist);

  // if (queryResultUserExists.rowCount > 0) {
  //   throw new AppError("User already exists", 409);
  // }

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
