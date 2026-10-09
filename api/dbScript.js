const dotEnv = require("dotenv/config");
const { createClient } = require("@libsql/client");

const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
});

module.exports = db;