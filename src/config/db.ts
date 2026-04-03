require("dotenv").config();

const { Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "task_app",
    password: "12345",
    port: process.env.DB_PORT,
});

module.exports = pool;