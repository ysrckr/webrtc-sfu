import { createWorker, types } from "mediasoup";

import { WebRTCTLS } from "@/types/webrtc";

export class WebRTC {
  private static _instance: WebRTC;
  private _tls: WebRTCTLS;
  private _logLevel: types.WorkerLogLevel;
  private _worker: types.Worker | null;

  private constructor(tls: WebRTCTLS, logLevel: types.WorkerLogLevel) {
    this._tls = tls;
    this._logLevel = logLevel;
    this._worker = null;
  }

  public static Instance(tls: WebRTCTLS, logLevel: types.WorkerLogLevel) {
    return this._instance || (this._instance = new this(tls, logLevel));
  }

  public async newWorker() {
    const worker = await createWorker({
      logLevel: this._logLevel,
      dtlsCertificateFile: this._tls.cert,
      dtlsPrivateKeyFile: this._tls.key,
    });

    this._worker = worker;

    this._worker.on("died", (error) => {
      console.error("Mediasoup worker has died with error of " + error.message);
      setTimeout(() => process.exit(1), 2000);
    });
  }

  public get worker() {
    return this._worker;
  }
}
