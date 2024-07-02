const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queue = require('../Config/queue'); 
const logger = require('../Config/logger');

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        logger.info(`User '${username}' signed up successfully`);

        // Enqueue job
        queue.create('user_signup', { userId: newUser._id }).save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        logger.error(`Error signing up user: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');

        logger.info(`User '${username}' logged in successfully`);

        // Enqueue job
        queue.create('user_login', { userId: user._id }).save();

        res.status(200).json({ token });
    } catch (err) {
        logger.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup, login };
