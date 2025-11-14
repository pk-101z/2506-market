import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:5432/market"
});

export default client;