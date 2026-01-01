import { Client } from "pg";

async function query(queryObject) {
  // on instance of Client it's pass the configuration of connection
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); // instance of client for use on connection

  console.log({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  })

  await client.connect(); // connect on db

  try {
    let result;
    result = await client.query(queryObject);
    return result;
  } catch (e) {
    console.log('Database query error:', e);
  } finally {
    await client.end();
  }

}

export default {
  query: query
}