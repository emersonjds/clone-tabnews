import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SELECT version() AS version_postgres;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const usedConnections = await database.query("SELECT COUNT(*)::int FROM pg_stat_activity;");

  const dbName = process.env.DB_NAME;

  // Sanitization Query
  const getConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname =" + " $1",
    values: [dbName]
  });

  response.status(200).json({
    updated_at: updatedAt,
    version_pg: dbVersion.rows[0].version_postgres.split(" ")[1],
    max_connections: Number(maxConnectionsResult.rows[0].max_connections),
    used_connections: usedConnections.rows[0].count,
  });

}

export default status;
