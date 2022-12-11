import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser, getUserByEmail } from "./auth.service";
import { TLoginInput, TSignupInput } from "./auth.schema";
import logger from "../../libs/logger";
import bcrypt from "bcrypt";

/**
 * signupHandler
 * ------------------
 * method: post
 */
export function signupHandler(server: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: TSignupInput }>,
    reply: FastifyReply
  ) => {
    try {
      const input = request.body;

      // IF user exists
      const userExists = await getUserByEmail(input.email);
      if (userExists.length) {
        return reply.code(400).send({ message: "User already exists" });
      }

      // create user
      await createUser(input);

      // get user
      const user = await getUserByEmail(input.email);
      const { password, createdAt, ...userData } = user[0];

      // token
      const accessToken = server.jwt.sign({ id: userData.id, createdAt });

      // cookie
      reply.cookie("accessToken", accessToken, { httpOnly: true });

      return reply.code(200).send({ user: userData, accessToken });
    } catch (error: any) {
      logger.error(error?.message, "Error signupHandeler.");
      return reply.code(400).send({ message: "Error singupHandler." });
    }
  };
}

/**
 * loginHandler
 * ------------------
 * method: post
 */
export function loginHandler(server: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: TLoginInput }>,
    reply: FastifyReply
  ) => {
    try {
      const input = request.body;

      // get user
      const user = await getUserByEmail(input.email);
      if (user.length === 0) {
        return reply.code(400).send({ message: "Invaild crediencial." });
      }
      const { password, createdAt, ...userData } = user[0];

      // IF password don't matched
      const comparedPassword = bcrypt.compareSync(input.password, password);
      if (!comparedPassword) {
        return reply.code(400).send({ message: "Invaild crediencial." });
      }

      // token
      const accessToken = server.jwt.sign({ id: userData.id, createdAt });

      // cookie
      reply.cookie("accessToken", accessToken, { httpOnly: true });

      return reply.code(200).send({ user: userData, accessToken });
    } catch (error: any) {
      logger.error(error?.message, "Error loginHandler.");
      return reply.code(400).send({ message: "Error loginHandler." });
    }
  };
}

/**
 * logoutHandler
 * ------------------
 * method: post
 */
export function logoutHandler(server: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // cookie
      reply.clearCookie("accessToken", { sameSite: "none", secure: true });

      return reply
        .code(200)
        .send({ accessToken: "", message: "Logged out successfully." });
    } catch (error: any) {
      logger.error(error?.message, "Error logoutHandler.");
      return reply.code(400).send({ message: "Error logoutHandler." });
    }
  };
}
