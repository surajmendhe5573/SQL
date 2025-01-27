const db = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    create: (name, email, hashedPassword, callback) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT id, name, email, created_at FROM users';
        db.query(query, callback);
    }
};

module.exports = User;
