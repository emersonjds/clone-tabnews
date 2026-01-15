import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SELECT version() AS version_postgres;");
  // its possible to use SHOW server_version; as well
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const usedConnections = await database.query("SELECT COUNT(*)::int FROM pg_stat_activity;");

  const dbName = 'local_db';
  //Access data on query params
  const dbNameByQuery = request.query.dbName;
  // console.log(`Database name ${dbNameByQuery}`);
  const getConnections = await database.query(`SELECT count(*) ::int
                                               FROM pg_stat_activity
                                               WHERE datname = '${dbNameByQuery}';`);

  // const getConnections = await database.query("SELECT * FROM" + " pg_stat_activity WHERE datname='postgres';");

  //second situation
  // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = '';"

  //third situation
  // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = '';';"

  response.status(200).json({
    updated_at: updatedAt,
    version_pg: dbVersion.rows[0].version_postgres.split(" ")[1],
    max_connections: Number(maxConnectionsResult.rows[0].max_connections),
    used_connections: usedConnections.rows[0].count,
  });

}

export default status;
