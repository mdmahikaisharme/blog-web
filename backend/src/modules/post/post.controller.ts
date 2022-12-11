import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getCategoryPosts,
  getPostById,
  updatePostById,
} from "./post.service";
import { TPostCreateInput, TPostUpdateInput } from "./post.schema";
import logger from "../../libs/logger";

/**
 * createPostHandler
 * ------------------
 * method: post
 * body: postCreateInput
 */
export async function createPostHandler(
  request: FastifyRequest<{ Body: TPostCreateInput }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as unknown as Record<string, string>;

    await createPost({
      ...request.body,
      userId: auth.id,
    });

    return reply.code(200).send({ message: "Post has been created." });
  } catch (error: any) {
    logger.error(error?.message, "Error createPostHandler.");
    return reply.code(400).send({ message: "Error createPostHandler." });
  }
}

/**
 * updatePostHandler
 * ------------------
 * method: put
 * params: :postId
 * body: postUpdateInput
 */
export async function updatePostHandler(
  request: FastifyRequest<{
    Body: TPostUpdateInput;
    Params: { postId: string };
  }>,
  reply: FastifyReply
) {
  try {
    await updatePostById(request.body, request.params.postId);

    return reply.code(200).send({ message: "Post has been updated." });
  } catch (error: any) {
    logger.error(error?.message, "Error updatePostHandler.");
    return reply.code(400).send({ message: "Error updatePostHandler." });
  }
}

/**
 * deletePostHandler
 * ------------------
 * method: delete
 * params: :postId
 */
export async function deletePostHandler(
  request: FastifyRequest<{ Params: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    await deletePostById(request.params.postId);

    return reply.code(200).send({ message: "Post has been deleted." });
  } catch (error: any) {
    logger.error(error?.message, "Error deletePostHandler.");
    return reply.code(400).send({ message: "Error deletePostHandler." });
  }
}

/**
 * getAllPostsHandler
 * ------------------
 * method: get
 */
export async function getAllPostsHandler(
  request: FastifyRequest<{ Querystring: { category: string } }>,
  reply: FastifyReply
) {
  try {
    const category = request.query.category;
    const posts = category
      ? await getCategoryPosts(category)
      : await getAllPosts();

    return reply.code(200).send({ posts });
  } catch (error: any) {
    logger.error(error?.message, "Error getAllPostsHandler.");
    return reply.code(400).send({ message: "Error getAllPostsHandler." });
  }
}

/**
 * getPostHandler
 * ------------------
 * method: get
 * params: :postId
 */
export async function getPostHandler(
  request: FastifyRequest<{ Params: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const post = await getPostById(request.params.postId);

    return reply.code(200).send({ post: post[0] });
  } catch (error: any) {
    logger.error(error?.message, "Error getPostHandler.");
    return reply.code(400).send({ message: "Error getPostHandler." });
  }
}
