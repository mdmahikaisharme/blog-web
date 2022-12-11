import createServer from "./createServer";
import logger from "./logger";
import gracefulShutdown from "./gracefulShutdown";

export default async function startServer() {
  const server = await createServer();

  // start server
  server.listen({ host: "127.0.0.1", port: 5000 });
  logger.log("Server is started...");

  // shutdown
  gracefulShutdown(server);

  return server;
}
