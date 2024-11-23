const sql = require('mssql');

const config = {
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    server: process.env.DB_SERVER || 'your_server',
    database: process.env.DB_NAME || 'TestDB',
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
