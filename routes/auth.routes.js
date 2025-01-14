const express = require('express');
const { register, login, updateUserProfile } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:userId', updateUserProfile)

module.exports = router;
