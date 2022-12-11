import { FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify";
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getPostHandler,
  updatePostHandler,
} from "./post.controller";

export default function postRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.get(
    "/all",
    {
      preHandler: [server.authenticate],
    },
    getAllPostsHandler
  );
  server.post(
    "/create",
    {
      preHandler: [server.authenticate],
    },
    createPostHandler
  );
  server.get(
    "/:postId",
    {
      preHandler: [server.authenticate],
    },
    getPostHandler
  );
  server.put(
    "/:postId",
    {
      preHandler: [server.authenticate],
    },
    updatePostHandler
  );
  server.delete(
    "/:postId",
    {
      preHandler: [server.authenticate],
    },
    deletePostHandler
  );

  done();
}
