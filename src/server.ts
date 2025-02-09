import Elysia, { ElysiaConfig } from "elysia";
import { ServerOptions, TLS } from "./types/server";

import { Swagger } from "./config/swagger";
import { rootRoute } from "./routes/root";
import { swagger } from "@elysiajs/swagger";

export class Server {
  private static _instance: Server;
  private _version?: number;
  private _port: number;
  private _tls?: TLS;

  private constructor(port: number, tls?: TLS, version?: number) {
    this._version = version && version > 0 ? version : 1;
    this._port = port;
    this._tls = tls;
  }

  public static Instance(port: number, tls?: TLS, version?: number) {
    return this._instance || (this._instance = new this(port, tls, version));
  }

  public run() {
    const serverOptions: ServerOptions = {
      port: this._port,
      hostname: "0.0.0.0",
    };

    if (this._tls) {
      serverOptions["tls"] = this._tls;
    }

    const swg = new Swagger("WebRTC SFU", this._version);
    const app = new Elysia({ prefix: `/api/v${this._version}` })
      .use(swagger(swg.config))
      .use(rootRoute())
      .listen(serverOptions);

    console.info(
      `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`
    );
  }
}
