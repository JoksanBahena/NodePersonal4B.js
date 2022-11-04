const mysql = require ("mysql")
require ('dotenv').config();

const client = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    debug: false
});

const query = (query, params) => {
    return new Promise((resolve, reject) => {
        client.getConnection((error, conn) => {
            if(error) reject(error);
            conn.query(query, params, (error, rows) => {
                if(error) reject(error);
                conn.release();
                resolve(rows);

            });
        });
    });
};

module.exports = {
    query
}