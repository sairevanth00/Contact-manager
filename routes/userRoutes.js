const express = require('express');
const router = express.Router();
const { registerUsers, loginUsers, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUsers )

router.post('/login', loginUsers)

router.get('/current', validateToken, currentUser)

module.exports = router