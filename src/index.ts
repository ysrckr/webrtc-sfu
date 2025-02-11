import { MediaKind, RtpCodecCapability } from "mediasoup/node/lib/types";

import { Server } from "./server";
import { TLS } from "./types/server";
import { Server as WSServer } from "socket.io";
import { WebRTC } from "./lib/webrtc";
import { join } from "node:path";

const port = process.env.PORT ? +process.env.PORT : 8000;
const workerLogLevel = "warn";

const tlsKeyPath = join(import.meta.dir, "../certs/key.pem");
const tlsCertPath = join(import.meta.dir, "../certs/cert.pem");

const tls: TLS = {
  key: Bun.file(tlsKeyPath),
  cert: Bun.file(tlsCertPath),
};

const webrtcTLS = {
  key: tlsKeyPath,
  cert: tlsCertPath,
};

const mediaCodecs: RtpCodecCapability[] = [
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

const webrtc = WebRTC.Instance(webrtcTLS, workerLogLevel);
webrtc.newWorker();
const router = await webrtc.worker?.createRouter({ mediaCodecs });

const server = Server.Instance(port, tls);

server.run();
