const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
});

// Pre-save hook to hash the password before saving
personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) {
        return next(); // If password is not modified, skip hashing
    }
    try {
        const salt = await bcrypt.genSalt(10); //handle password hashing == genrate a salt

        const hashedPassword = await bcrypt.hash(person.password, salt); //hash the password with the salt

        person.password = hashedPassword; // Set the hashed password

        next(); //continue to the next middleware or save operation

    } catch (error) {
        return next(error);
    }
});

// Method to compare password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the hashed password
        return isMatch; // Return true if passwords match, false otherwise
    } catch (error) {
        throw error; // Propagate the error
    }
}

// export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
