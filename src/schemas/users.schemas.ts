import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean(),
  active: z.boolean(),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({
  password: true,
});

const allUsersSchema = z.array(returnUserSchema);

export {
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  allUsersSchema,
};
