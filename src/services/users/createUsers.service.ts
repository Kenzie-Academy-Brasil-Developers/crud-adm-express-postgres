import { IUser, IUserResult, IUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";

const createUsersService = async (userData: IUser): Promise<IUserWithoutPassword> => {
  const query: string = format(
    `
    INSERT INTO
        users(%I)
    VALUES(%L)
    RETURNING id, name, email, admin, active;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(query);

  return queryResult.rows[0];
};

export default createUsersService;
