import { ElysiaWS } from "elysia/dist/ws";
import { t } from "elysia";

export const peersHandler = () => {
  return {
    body: t.Object({
      room: t.String(),
      peer: t.String(),
    }),
    message(ws: ElysiaWS, { room, peer }: { room: string; peer: string }) {
      ws.send(`Hello, ${peer}! You are in room ${room}`);
    },
  };
};
