const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(query, [email]);
        return results;
    },
    create: async (name, email, hashedPassword) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [name, email, hashedPassword]);
        return result;
    },
    findAll: async () => {
        const query = 'SELECT id, name, email, created_at FROM users';
        const [results] = await db.query(query);
        return results;
    },
    update: async (id, name, email, hashedPassword) => {
        let query;
        let params;

        if (hashedPassword) {
            query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
            params = [name, email, hashedPassword, id];
        } else {
            query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
            params = [name, email, id];
        }

        const [result] = await db.query(query, params);
        return result;
    },
    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [results] = await db.query(query, [id]);
        return results[0]; 
    },    
    delete: async (id) => {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = User;
