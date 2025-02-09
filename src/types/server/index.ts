import { BunFile } from "bun";

export type TLS = {
  key: BunFile;
  cert: BunFile;
};

export type ServerOptions = {
  port: number;
  hostname: string;
  tls?: TLS;
};
