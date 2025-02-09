import { createWorker, types } from "mediasoup";

import { MediasoupTLS } from "@/types/mediasoup";

export class WebRTC {
  private static _instance: WebRTC;
  private _tls: MediasoupTLS;
  private _logLevel: types.WorkerLogLevel;
  private _workers: types.Worker[];

  private constructor(tls: MediasoupTLS, logLevel: types.WorkerLogLevel) {
    this._tls = tls;
    this._logLevel = logLevel;
    this._workers = [];
  }

  public static Instance(tls: MediasoupTLS, logLevel: types.WorkerLogLevel) {
    return this._instance || (this._instance = new this(tls, logLevel));
  }

  public async newWorker() {
    const worker = await createWorker({
      logLevel: this._logLevel,
      dtlsCertificateFile: this._tls.cert,
      dtlsPrivateKeyFile: this._tls.key,
    });

    this._workers.push(worker);
  }
}
