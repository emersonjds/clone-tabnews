import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const methodsAllowed = ["GET", "POST"];

  if (!methodsAllowed.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} Not Allowed` });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigration = {
      dbClient: dbClient,
      direction: "up",
      dir: join("infra", "migrations"),
      dryRun: false,
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...defaultMigration,
        dryRun: true,
      });
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner(defaultMigration);
      return response.status(201).json(migratedMigrations);
    }

  } catch (error) {

    console.error("Error running migrations:", error);

    throw error;
  } finally {
    await dbClient.end();
  }
}
