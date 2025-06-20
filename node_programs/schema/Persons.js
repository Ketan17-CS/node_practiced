const mongoose = require('mongoose');

// Define the schema for a person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['softwareEngineer', 'Doctor', 'Teacher', 'Artist'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: false
    },
});

// export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
