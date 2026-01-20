import {Client} from "pg";

async function query(queryObject) {
  // on instance of Client it's pass the configuration of connection
  const client = new Client({
    host: process.env.PRD_HOST,
    port: process.env.PRD_PORT,
    user: process.env.PRD_USER,
    database: process.env.PRD_DB,
    password: process.env.PRD_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  }); // instance of client for use on connection

  // console.log('Return of db...',{
  //   host: process.env.POSTGRES_HOST,
  //   port: process.env.POSTGRES_PORT,
  //   user: process.env.POSTGRES_USER,
  //   database: process.env.POSTGRES_DB,
  //   password: process.env.POSTGRES_PASSWORD,
  // });

  try {
    await client.connect(); // connect on db
    return await client.query(queryObject);
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