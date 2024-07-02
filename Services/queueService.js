const redisClient = require('../Config/redis');

module.exports = {
    enqueue: (userId, request) => {
        redisClient.lpush(userId, JSON.stringify(request), (err, reply) => {
            if (err) {
                console.error('Error enqueuing request:', err);
            }
        });
    },
    dequeue: (userId, callback) => {
        redisClient.rpop(userId, (err, reply) => {
            if (err) {
                console.error('Error dequeuing request:', err);
            } else {
                callback(JSON.parse(reply));
            }
        });
    }
};
