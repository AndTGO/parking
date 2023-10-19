require('dotenv').config();

const { createPool } = require('mysql2/promise');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const pool = createPool({
  host,
  user,
  password,
  port,
  database,
});

module.exports = {
  pool
};
