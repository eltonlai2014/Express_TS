import { WebServer } from "./WebServer";

const start = () => {
  const server = new WebServer();
  server.start();
};

start();
