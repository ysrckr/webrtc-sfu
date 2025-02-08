import Elysia from "elysia";
import { rootHandler } from "../handlers/root";

export const apiRoute = () => {
  return new Elysia({ prefix: "/api" });
};

export const versionRoute = (version: number) => {
  return new Elysia({ prefix: `v${version}` }).get("/", rootHandler);
};
