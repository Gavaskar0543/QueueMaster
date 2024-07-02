const kue = require('kue');
const queue = kue.createQueue({
    redis: {
        host: 'localhost',
        port: 6379
    }
});

queue.on('ready', () => {
    console.log('Kue is ready to process jobs');
});

queue.on('error', (err) => {
    console.error('There was an error in the main queue:', err);
});

module.exports = queue;
