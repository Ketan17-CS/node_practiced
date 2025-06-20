const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/hotelDB';

//set up Mongodb connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

//define event listeners for the connection
db.on('connected', () => {
    console.log('Mongoose connected to server: ' + mongoURI);
});

db.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected from server: ' + mongoURI);
});

//export the db connection
module.exports = db;