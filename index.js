const express = require('express');
const mongoose = require('./Config/database');
const redisClient = require('./Config/redis');
const userRoutes = require('./Router');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
//router middleware
app.use('/api/users', userRoutes);
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
