import {Client} from "pg";

async function query(queryObject) {
  // on instance of Client it's pass the configuration of connection
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); // instance of client for use on connection

  try {
    await client.connect(); // connect on db
    return  await client.query(queryObject);
  } catch (error) {
    console.log('Database query error:', error);
    throw error;
  } finally {
    await client.end();
  }

}

export default {
  query: query
}