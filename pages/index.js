import React, { useEffect } from "react";
import { sql } from "bun";

const Home = () => {
  useEffect(() => {
    const createTable = async () => {
      try {
        await sql`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`;
        console.log("Table created successfully");
      } catch (error) {
        console.error("Error creating table:", error);
      }
    };

    createTable();
  }, []);

  return <div>Home App</div>;
};

export default Home;
