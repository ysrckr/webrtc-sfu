import { ElysiaWS } from "elysia/dist/ws";
import { t } from "elysia";

export const peersHandler = () => {
  return {
    body: t.Object({
      message: t.String(),
    }),
    message(ws: ElysiaWS, { message }: { message: string }) {
      ws.send({
        message,
        time: Date.now(),
      });
    },
  };
};
