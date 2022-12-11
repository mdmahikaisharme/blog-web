import { CreateServer } from "./createServer";
import logger from "./logger";

const SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];

export default function gracefulShutdown(server: CreateServer) {
  SIGNALS.forEach((signal) => {
    process.on(signal, () => shutdownServer({ signal, server }));
  });
}

interface IShutdownServer {
  signal: typeof SIGNALS[number];
  server: CreateServer;
}
function shutdownServer({ signal, server }: IShutdownServer) {
  logger.log(`Got signal: ${signal}`);

  server.close();
  logger.log(`Server is closed.`);

  process.exit(0);
}
