const sql = require('mssql');

const config = {
    user: process.env.DB_USER || 'node-mysql',
    password: process.env.DB_PASSWORD || '#My12345',
    server: process.env.DB_SERVER || 'node-mysql.database.windows.net',
    database: process.env.DB_NAME || 'db1',
    options: {
        encrypt: true,
        trustServerCertificate: true, // Disable for production
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
    });

module.exports = { sql, poolPromise };
