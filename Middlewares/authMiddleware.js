const jwt = require('jsonwebtoken');
const User = require('../Model/userModel'); 
const logger = require('../Config/logger');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    const tokenString = token.split('Bearer ')[1]; // Extract the token string without 'Bearer '
console.log(tokenString)
    try {
        const decoded = jwt.verify(tokenString, 'SECRET_KEY'); // Verify the token with your secret key
        console.log(decoded)
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach the user object to the request for further processing
        console.log('user validation successfull')
        next(); // Move to the next middleware or route handler
    } catch (err) {
        logger.error(`Error verifying token: ${err.message}`);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
