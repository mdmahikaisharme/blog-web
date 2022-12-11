import { z } from "zod";
// import { } from "fastify-zod"

export const email = { email: z.string().email() };
export const password = { password: z.string().min(6).max(64) };

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  ...email,
  ...password,
  img: z.string(),
  createdAt: z.number(),
});
const userReplySchema = z.object({
  id: z.number(),
  name: z.string(),
  ...email,
  img: z.string(),
});

export type TUser = z.infer<typeof userSchema>;
export type TUserReply = z.infer<typeof userReplySchema>;

// export const {schemas: userSchemas, $ref} = buildJsonSchemas({createUserSchema});
