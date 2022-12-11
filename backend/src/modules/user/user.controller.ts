import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../../libs/logger";
import { getUserById } from "./user.service";

/**
 * getUserHandler
 * ------------------
 * method: get
 * parmas: userId
 */
export async function getUserHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  try {
    // get user by id
    const user = await getUserById(request.params.userId);
    if (user.length === 0) {
      return reply.code(400).send({ message: "User not found." });
    }
    const { password, createdAt, ...userData } = user[0];

    return reply.code(200).send({ user: userData });
  } catch (error: any) {
    logger.error(error?.message, "Error getUserHandler.");
    return reply.code(400).send({ message: "Error getUserHandler." });
  }
}

/**
 * getCurrentUserHandler
 * ------------------
 * method: get
 */
export async function getCurrentUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // get user by id
    const auth = request.user as unknown as Record<string, string>;
    const user = await getUserById(auth.id);
    if (user.length === 0) {
      return reply.code(400).send({ message: "User not found." });
    }
    const { password, createdAt, ...userData } = user[0];

    return reply.code(200).send({ user: userData });
  } catch (error: any) {
    logger.error(error?.message, "Error getCurrentUserHandler.");
    return reply.code(400).send({ message: "Error getCurrentUserHandler." });
  }
}
