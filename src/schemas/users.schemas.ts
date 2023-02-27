import { hashSync } from "bcryptjs";
import { optional, z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean(),
  active: z.boolean(),
});

const updateUserSchema = z.object({
  name: optional(z.string().min(3).max(20)),
  email: optional(z.string().email()),
  password: optional(
    z.string().transform((pass) => {
      return hashSync(pass, 10);
    })
  ),
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
  updateUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  allUsersSchema,
};
