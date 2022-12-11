import { FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify";
import { loginHandler, logoutHandler, signupHandler } from "./auth.controller";

export default function authRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/signup", {}, signupHandler(server));
  server.post("/login", {}, loginHandler(server));
  server.post("/logout", {}, logoutHandler(server));

  done();
}
