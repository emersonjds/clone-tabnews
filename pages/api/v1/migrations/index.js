import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const migrationsDir = join(process.cwd(), "infra", "migrations");
  const dbClient = await database.getNewClient();

  try {
    const defaultMigration = {
      dbClient: dbClient,
      direction: "up",
      dir: migrationsDir,
      dryRun: false,
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "POST") {
      const pendingMigrations = await migrationRunner(defaultMigration);
      dbClient.end();
      return response.status(201).json(pendingMigrations);
    }

    if (request.method === "GET") {
      const resultedMigrations = await migrationRunner({
        ...defaultMigration,
        dryRun: true,
      });
      dbClient.end();
      return response.status(200).json(resultedMigrations);
    }
    return response.status(405).end();
  } finally {
    await dbClient.end();
  }
}
