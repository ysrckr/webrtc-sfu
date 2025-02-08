import Elysia from "elysia";
import { rootHandler } from "../handlers/root";

export const rootRoute = () => {
  return new Elysia().get("/", rootHandler);
};
