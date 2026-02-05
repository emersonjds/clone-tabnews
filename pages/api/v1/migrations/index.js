import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const migrationsDir = join(process.cwd(), "infra", "migrations");

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      direction: "up",
      dir: migrationsDir,
      dryRun: false,
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  } 
  
  if (request.method === "GET") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      direction: "up",
      dir: migrationsDir,
      dryRun: true,
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }

  // console.log(migrations);
  return response.status(405).end();
  // return response.status(200).json(migrations);
}



