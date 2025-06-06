import { env } from "~/env";
import { defineConfig } from "drizzle-kit"
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
    dialect: "postgresql",
    schema: "./src/server/db/schema.ts",
    //driver: "turso" // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    dbCredentials: {
      url: env.POSTGRES_URL,    }
})