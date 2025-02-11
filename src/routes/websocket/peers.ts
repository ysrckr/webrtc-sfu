import Elysia from "elysia";
import { peersHandler } from "@/handlers/websocket/peers";

export const peersRoute = () => {
  return new Elysia().ws("/peer", peersHandler);
};
