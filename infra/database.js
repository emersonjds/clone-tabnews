import { Client } from "pg";

async function query(queryObject) {
  // on instance of Client it's pass the configuration of connection
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: '123456',
  }); // instance of client for use on connection

  await client.connect(); // connect on db

  try {
    const result = await client.query(queryObject);
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