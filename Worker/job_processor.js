const queue = require('../Config/queue'); // Import the Kue queue
const logger = require('../Config/logger');

queue.process('user_signup', (job, done) => {
    logger.info(`Processing user signup job for user ID: ${job.data.userId}`);
    // Simulate processing time
    setTimeout(() => {
        logger.info(`User signup job completed for user ID: ${job.data.userId}`);
        done();
    }, 1000);
});

queue.process('user_login', (job, done) => {
    logger.info(`Processing user login job for user ID: ${job.data.userId}`);
    // Simulate processing time
    setTimeout(() => {
        logger.info(`User login job completed for user ID: ${job.data.userId}`);
        done();
    }, 1000);
});
