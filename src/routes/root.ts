import { healthCheckHandler, rootHandler } from "../handlers/root";

import Elysia from "elysia";

export const rootRoute = () => {
  return new Elysia()
    .get("/", rootHandler)
    .get("/healthcheck", healthCheckHandler);
};
