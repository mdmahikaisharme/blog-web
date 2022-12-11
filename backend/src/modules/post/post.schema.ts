import { z } from "zod";
// import { } from "fastify-zod"

const title = { title: z.string().max(255) };
const describtion = { describtion: z.string().max(10000) };
const postCore = {
  ...title,
  ...describtion,
  img: z.string(),
  category: z.string(),
};

const postSchema = z.object({
  id: z.string(),
  ...postCore,
  userId: z.number(),
  createdAt: z.string(),
});
const postReplySchema = z.object({
  id: z.string(),
  ...postCore,
  userId: z.number(),
  createdAt: z.string(),
});

const postCreateInputSchema = z.object({
  ...postCore,
});
const postUpdateInputSchema = z.object({
  ...postCore,
  userId: z.number(),
  createdAt: z.string(),
});

export type TPost = z.infer<typeof postSchema>;
export type TPostReply = z.infer<typeof postReplySchema>;
export type TPostCreateInput = z.infer<typeof postCreateInputSchema>;
export type TPostUpdateInput = z.infer<typeof postUpdateInputSchema>;

// export const {schemas: userSchemas, $ref} = buildJsonSchemas({createUserSchema});
