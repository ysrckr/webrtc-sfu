import { MediaKind, RtpCodecCapability } from "mediasoup/node/lib/types";

import { Server } from "./server";
import { TLS } from "./types/server";
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

const webrtc = WebRTC.Instance(webrtcTLS, workerLogLevel);

const server = Server.Instance(port, tls);

server.run();
