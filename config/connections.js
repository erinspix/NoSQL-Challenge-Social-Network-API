const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkDB');

module.exports = moangoose.connection;
