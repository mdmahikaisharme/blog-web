import { z } from "zod";
import { email, password } from "../user/user.schema";
// import { } from "fastify-zod"

const signupInputSchema = z.object({
  name: z.string(),
  ...email,
  ...password,
  img: z.string(),
});
const loginInputSchema = z.object({
  ...email,
  ...password,
});

export type TSignupInput = z.infer<typeof signupInputSchema>;
export type TLoginInput = z.infer<typeof loginInputSchema>;

// export const {schemas: userSchemas, $ref} = buildJsonSchemas({createUserSchema});
