const express = require('express');
const mongoose = require('./Config/database');
const redisClient = require('./Config/redis');
const userRoutes = require('./Router');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
