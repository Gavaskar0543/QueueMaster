const redisClient = require('../Config/redis');
const logger = require('../Config/logger');

const QueueService = {
    enqueue: (userId, request) => {
        redisClient.rpush(`queue:${userId}`, JSON.stringify(request), (err, reply) => {
            if (err) {
                logger.error(`Error enqueuing request: ${err.message}`);
            } else {
                logger.info(`Request enqueued successfully for user ${userId}`);
            }
        });
    },

    dequeue: (userId, callback) => {
        redisClient.lpop(`queue:${userId}`, (err, reply) => {
            if (err) {
                logger.error(`Error dequeuing request: ${err.message}`);
                callback(null);
            } else {
                if (reply) {
                    const request = JSON.parse(reply);
                    logger.info(`Request dequeued successfully for user ${userId}`);
                    callback(request);
                } else {
                    logger.info(`No more requests in queue for user ${userId}`);
                    callback(null);
                }
            }
        });
    }
};

module.exports = QueueService;
