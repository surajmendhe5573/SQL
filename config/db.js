// const mysql= require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         process.exit(1);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// module.exports = db;

const mysql = require('mysql2/promise'); // Use the promise wrapper
require('dotenv').config();

const db = mysql.createPool({ // Create a connection pool for better scalability
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
});

db.getConnection()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    });

module.exports = db;

