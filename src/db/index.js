const Pool = require('pg').Pool
const config = require('../config/index')

const pool = new Pool({
    user: config.userDb,
    password: config.passwordDb,
    host: config.hostDb,
    port: config.portDb,
    database: config.databaseName
})

module.exports = pool