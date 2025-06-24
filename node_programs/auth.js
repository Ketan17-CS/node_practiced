const passport = require('passport'); // Import passport for authentication
const localStrategy = require('passport-local').Strategy; // Import local strategy for passport
const Person = require('./schema/Persons'); // Import the Person model

passport.use(new localStrategy(async (username, password, done) => {
    try {
        //console.log('Received credentials:', username, password);

        // Check if user exists
        const user = await Person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare password using comparePassword function
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch)
            return done(null, false, { message: 'Incorrect password.' });
        else
            // Successful authentication
            return done(null, user);

    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export the configured passport instance
// This will be used in the server.js file to initialize passport and use it for authentication.