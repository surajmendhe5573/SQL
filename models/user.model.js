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
    },
    update: (id, name, email, hashedPassword, callback) => {
        let query;
        let params;

        if (hashedPassword) {
            query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
            params = [name, email, hashedPassword, id];
        } else {
            query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
            params = [name, email, id];
        }

        db.query(query, params, callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = User;
