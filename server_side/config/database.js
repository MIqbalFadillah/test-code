const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

// const pool = createPool({
//     port: 3308,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "node_api_test",
//     connectionLimit: 10
// });

module.exports = pool;