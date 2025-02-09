import { TLS } from "@/types/server";

export class WebRTC {
  private static _instance: WebRTC;
  private _tls: TLS;
  private constructor(tls: TLS) {
    this._tls = tls;
  }

  public static Instance(tls: TLS) {
    return this._instance || (this._instance = new this(tls));
  }
}
