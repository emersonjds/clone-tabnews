import { Client } from "pg";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const dbVersion = await client.query('SELECT version();');
    const maxConnectionsResult = await client.query("SHOW max_connections;");
    const usedConnections = await client.query("SELECT COUNT(*) FROM pg_stat_activity;");

    console.log('Database version:', dbVersion.rows[0].version);
    console.log('Database max connections', maxConnectionsResult.rows[0].max_connections);
    console.log('Database usedConnections', usedConnections.rows[0].count)

    response.status(200).json({
      updated_at: updatedAt,
      version_pg: '',
      max_connections: '',
      used_connections: '',
    });

  } catch (e) {
    console.log('Database connection error:', e);
  } finally {
    await client.end();
  }

}

export default status;
