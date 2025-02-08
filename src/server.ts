import Elysia from "elysia";
import { Swagger } from "./config/swagger";
import { rootRoute } from "./routes/root";
import { swagger } from "@elysiajs/swagger";

export class Server {
  private static _instance: Server;
  private _version: number;
  private _port: number;

  private constructor(port: number, version?: number) {
    this._version = version && version > 0 ? version : 1;
    this._port = port;
  }

  public static Instance(port: number, version?: number) {
    return this._instance || (this._instance = new this(port, version));
  }

  public run() {
    const swg = new Swagger("WebRTC SFU", this._version);
    const app = new Elysia({ prefix: `/api/v${this._version}` })
      .use(swagger(swg.config))
      .use(rootRoute())
      .listen(this._port);

    console.info(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
    );
  }
}
