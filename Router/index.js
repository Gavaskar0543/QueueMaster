const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.get('/process', authMiddleware, userController.processRequests);

module.exports = router;
