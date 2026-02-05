import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const migrationsDir = join(process.cwd(), "infra", "migrations");

  const defaultMigration = {
    databaseUrl: process.env.DATABASE_URL,
    direction: "up",
    dir: migrationsDir,
    dryRun: false,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "POST") {
    const pendingMigrations = await migrationRunner(defaultMigration);
    return response.status(201).json(pendingMigrations);
  } 
  
  if (request.method === "GET") {
    const resultedMigrations = await migrationRunner({
      ...defaultMigration,
      dryRun: true,
    });
    return response.status(200).json(resultedMigrations);
  }

  // console.log(migrations);
  return response.status(405).end();
  // return response.status(200).json(migrations);
}



