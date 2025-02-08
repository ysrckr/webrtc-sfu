import { Server } from "./server";

const port = process.env.PORT ? +process.env.PORT : 8000;

const server = Server.Instance(port);

server.run();
