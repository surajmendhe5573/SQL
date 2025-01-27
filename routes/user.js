const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAllUsers);

module.exports = router;
