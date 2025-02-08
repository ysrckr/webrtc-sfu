import { apiRoute, versionRoute } from "./routes/root";

import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";

export default function Run(port: number) {
  const version = 1;
  const app = new Elysia()
    .use(apiRoute)
    .use(versionRoute(version))
    .use(
      swagger({
        documentation: {
          info: {
            title: "Elysia Documentation",
            version: String(version),
          },
        },
      })
    )
    .listen(port);

  console.info(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
}
