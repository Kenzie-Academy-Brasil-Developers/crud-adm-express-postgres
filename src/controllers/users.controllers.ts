import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import listUsersService from "../services/users/listAllUsers.service";
import { IUser } from "../interfaces/users.interfaces";
import listUserService from "../services/users/listUser.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;
  try {
    const newUser = await createUsersService(userData);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("-------------");
  console.log(req.user.sub);
  console.log("--------------");

  const userId: any = req.user.sub;

  const users = await listUserService(userId);

  return res.json(users);
};

export { createUsersController, listUsersController, listUserController };
