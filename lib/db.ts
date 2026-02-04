import postgres from "postgres";

const clientMap = new Map<string, postgres.Sql>();

export function getAdminClient() {
  if (clientMap.has("saas")) return clientMap.get("saas")!;

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  const client = postgres(dbUrl, {
    ssl: "require",
    max: 15, // limit pool size to reduce pressure
    idle_timeout: 30, // Close idle connections after 30 seconds
  });

  clientMap.set("saas", client);
  return client;
}
