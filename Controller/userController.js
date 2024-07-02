const queueService = require('../Services/queueService');

module.exports = {
    processRequests: (req, res) => {
        const userId = req.user._id;
        queueService.dequeue(userId, (request) => {
            if (request) {
                // Process the request
                console.log('Processing request:', request);
                res.status(200).send('Request processed');
            } else {
                res.status(200).send('No more requests');
            }
        });
    }
};
