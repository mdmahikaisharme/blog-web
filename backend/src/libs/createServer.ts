import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import postRoutes from "../modules/post/post.route";
import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/user/user.route";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export default async function createServer() {
  const server = fastify();

  // middleware
  server.register(fastifyCors, {});
  server.register(fastifyCookie, {});
  server.register(fastifyJwt, { secret: "It's our secret" });

  // decorate
  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error: any) {
        reply
          .code(400)
          .send({ message: "Authenticate failed", error: error.message });
      }
    }
  );

  // health
  server.get(
    "/health",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(200).send("Server is okey :-)");
    }
  );

  // routes
  server.register(authRoutes, { prefix: "/api/auth" });
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(postRoutes, { prefix: "/api/posts" });

  return server;
}

export type CreateServer = Awaited<ReturnType<typeof createServer>>;
