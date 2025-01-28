const express = require('express');
const { signup, login, getAllUsers, updateUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update/:id', updateUser);

module.exports = router;
