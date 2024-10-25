const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://espix:Password1234@cluster0.wyjpt.mongodb.net/socialMedia_db?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
