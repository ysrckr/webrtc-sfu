import {
  MediaKind,
  RtpCodecCapability,
} from "mediasoup/node/lib/rtpParametersTypes";
import { createWorker, types } from "mediasoup";

import { WebRTCTLS } from "@/types/webrtc";

export class WebRTC {
  private static _instance: WebRTC;
  private _tls: WebRTCTLS;
  private _logLevel: types.WorkerLogLevel;
  private _worker: types.Worker | null;
  private _router: types.Router | null;
  private _mediaCodecs: RtpCodecCapability[];

  private constructor(tls: WebRTCTLS, logLevel: types.WorkerLogLevel) {
    this._tls = tls;
    this._logLevel = logLevel;
    this._worker = null;
    this._router = null;
    this._mediaCodecs = [
      {
        kind: "audio" as MediaKind,
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video" as MediaKind,
        mimeType: "video/VP8",
        clockRate: 90000,
      },
      {
        kind: "video" as MediaKind,
        mimeType: "video/VP9",
        clockRate: 90000,
      },
      {
        kind: "video" as MediaKind,
        mimeType: "video/h264",
        clockRate: 90000,
      },
      {
        kind: "video" as MediaKind,
        mimeType: "video/h265",
        clockRate: 90000,
      },
    ];
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

  public async newRouter(mediaCodecs?: RtpCodecCapability[]) {
    let router;
    if (!mediaCodecs) {
      router = await this._worker?.createRouter({
        mediaCodecs: this._mediaCodecs,
      });
    } else {
      router = await this._worker?.createRouter({ mediaCodecs });
    }

    if (router) {
      this._router = router;
      return;
    }

    this._router = null;
  }

  public get worker() {
    return this._worker;
  }

  public async router() {
    return this._router;
  }
}
