import { Client } from "pg";

async function query(queryObject) {
  const client = new Client(); // instance of client for use on connection
  await client.connect(); // connect on db
  const result = await client.query(queryObject);
  await client.end(); // close connection
}

export default {
  query: query
}