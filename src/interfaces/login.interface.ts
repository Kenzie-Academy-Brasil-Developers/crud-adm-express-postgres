
import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

type ILoginRequest = z.infer<typeof createLoginSchema>;

interface IJwtPayload {
    expiresIn: string;
    subject: string;
  }

export { ILoginRequest, IJwtPayload };
