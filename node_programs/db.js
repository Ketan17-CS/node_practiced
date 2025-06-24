require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL_LOCAL
//const mongoURL = process.env.MONGODB_URL;
//set up Mongodb connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

//define event listeners for the connection
db.on('connected', () => {
    console.log('Mongoose connected to server');
});

db.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected from server');
});

//export the db connection
module.exports = db;