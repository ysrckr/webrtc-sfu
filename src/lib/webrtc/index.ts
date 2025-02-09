import { createWorker, types } from "mediasoup";

import { MediasoupTLS } from "@/types/mediasoup";

export class WebRTC {
  private static _instance: WebRTC;
  private _tls: MediasoupTLS;

  private constructor(tls: MediasoupTLS) {
    this._tls = tls;
  }

  public static Instance(tls: MediasoupTLS) {
    return this._instance || (this._instance = new this(tls));
  }

  public async newWorker(logLevel: types.WorkerLogLevel) {
    return await createWorker({
      logLevel,
      dtlsCertificateFile: this._tls.cert,
      dtlsPrivateKeyFile: this._tls.key,
    });
  }
}
