import { QueryResult } from "pg";

interface IUser {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

interface IUserId extends IUser {
    id: number;
}

type IUserWithoutPassword = Omit<IUser, "password">
type IUserResult = QueryResult<IUserWithoutPassword>

export { IUser, IUserId, IUserWithoutPassword, IUserResult};
