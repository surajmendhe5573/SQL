const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.create(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error' });

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token });
    });
};

const getAllUsers = (req, res) => {
    User.findAll((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

module.exports = { signup, login, getAllUsers };
