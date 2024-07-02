const User = require('../Model/userModel');
const queueService = require('../Services/queueService');
const logger = require('../Config/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup a new user

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        logger.info(`User '${username}' signed up successfully`);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        logger.error(`Error signing up user: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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

        res.status(200).json({ token });
    } catch (err) {
        logger.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Process requests from user's queue
const processRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        // Enqueue request (assuming queueService handles this asynchronously)
        queueService.enqueue(userId, (enqueueError) => {
            if (enqueueError) {
                logger.error(`Error enqueuing request: ${enqueueError.message}`);
                return res.status(500).json({ error: 'Error enqueueing request' });
            }

            // Dequeue request
            queueService.dequeue(userId, (dequeueError, request) => {
                if (dequeueError) {
                    logger.error(`Error dequeuing request: ${dequeueError.message}`);
                    return res.status(500).json({ error: 'Error dequeuing request' });
                }

                if (request) {
                    // Simulating request processing (Replace with actual processing logic)
                    logger.info(`Processing request: ${JSON.stringify(request)}`);
                    res.status(200).json({ message: 'Request processed successfully', request });
                } else {
                    res.status(404).json({ message: 'No more requests in queue' });
                }
            });
        });
    } catch (err) {
        logger.error(`Error processing request: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup, login, processRequests };
