import { Server } from "./server";
import { TLS } from "./types/server";
import { join } from "node:path";

const port = process.env.PORT ? +process.env.PORT : 8000;

const tls: TLS = {
  key: Bun.file(join(import.meta.dir, "../certs/key.pem")),
  cert: Bun.file(join(import.meta.dir, "../certs/cert.pem")),
};

const server = Server.Instance(port, tls);

server.run();
