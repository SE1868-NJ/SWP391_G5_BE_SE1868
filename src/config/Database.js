const mysql = require('mysql2/promise');
require('dotenv').config()
const pool = mysql.createPool({
    host:'127.0.0.1',
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:'SWT_G5',
    port :3306,
    connectTimeout: 50000
})
module.exports = pool;