const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
//status checkup
router.get('/status', (req, res) => {
   return res.status(200).json({
        message: 'OK'
    });
});
// POST /api/users/signup - Create a new user
router.post('/signup', userController.signup);

// POST /api/users/login - Login user
router.post('/login', userController.login);



module.exports = router;
