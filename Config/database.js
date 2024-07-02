const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gavaskaraeg:ZrO5vvaJJp9mKxZs@dnsmanager.peexu9o.mongodb.net/?retryWrites=true&w=majority&appName=dnsmanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
