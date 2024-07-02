const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

// POST /api/users/signup - Create a new user
router.post('/signup', userController.signup);

// POST /api/users/login - Login user
router.post('/login', userController.login);

// Example protected route using authMiddleware
router.get('/process-requests', authMiddleware, userController.processRequests);

module.exports = router;
