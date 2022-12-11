import { FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify";
import { getCurrentUserHandler, getUserHandler } from "./user.controller";

export default function userRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.get(
    "/:userId",
    {
      preHandler: [server.authenticate],
    },
    getUserHandler
  );
  server.get(
    "/current",
    {
      preHandler: [server.authenticate],
    },
    getCurrentUserHandler
  );

  done();
}
