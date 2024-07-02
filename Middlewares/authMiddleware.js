const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const logger = require('../Config/logger');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        logger.error(`Error verifying token: ${err.message}`);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
