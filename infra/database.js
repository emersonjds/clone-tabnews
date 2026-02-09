import { Client } from "pg";

async function query(queryObject) {
  // const client = new Client({
  //   host: process.env.PRD_HOST,
  //   port: parseInt(process.env.PRD_PORT, 10),
  //   user: process.env.PRD_USER,
  //   database: process.env.PRD_DB,
  //   password: process.env.PRD_PASSWORD,
  //   ssl: getSSLConfig()
  // });

  // const client = new Client({
  //   host: process.env.POSTGRES_HOST,
  //   port: process.env.POSTGRES_PORT,
  //   user: process.env.POSTGRES_USER,
  //   database: process.env.POSTGRES_DB,
  //   password: process.env.POSTGRES_PASSWORD,
  // });

  let client;
  try {
    client = await getNewClient();
    await client.connect();
    return await client.query(queryObject);
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  } finally {
    await client.end();
  }
}

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  return client;
};

export default {
  query: query,
};

function getSSLConfig() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
