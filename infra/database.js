import { Client } from "pg";

async function query(queryObject) {
  // on instance of Client it's pass the configuration of connection
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '123456',
  }); // instance of client for use on connection
  await client.connect(); // connect on db
  const result = await client.query(queryObject);
  await client.end(); // close connection
}

export default {
  query: query
}