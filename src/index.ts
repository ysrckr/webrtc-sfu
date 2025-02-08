import { Server } from "./server";

const server = Server.Instance(8000);

server.run();
