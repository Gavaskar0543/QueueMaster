const express = require('express');
const mongoose = require('./Config/database');
const kue = require('kue');
const queue = require('./Config/queue');
require('./Worker/job_processor');
const userRoutes = require('./Router');
const cors = require('cors');

const app = express();

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
//router middleware
app.use('/api/users', userRoutes);
app.use(cors());

const PORT = process.env.PORT || 3000;
kue.app.listen(3001, () => {
    console.log('Kue is running on port 3001');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
