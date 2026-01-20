import {Client} from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.PRD_HOST,
    port: parseInt(process.env.PRD_PORT, 10),
    user: process.env.PRD_USER,
    database: process.env.PRD_DB,
    password: process.env.PRD_PASSWORD,
    ssl: true
  });

  try {
    await client.connect();
    return await client.query(queryObject);
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query
}