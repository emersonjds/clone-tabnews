import migrationRunner from "node-pg-migrate";
import { join } from 'node:path';

export default async function migrations(request, response) {  

  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    direction: "up",
    dir:join("infra", "migrations"),
    dryRun: true,
    verbose: true,
  });

  return response.status(200).json(migrations);
}



