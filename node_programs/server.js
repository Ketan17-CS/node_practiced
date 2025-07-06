require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db'); // Import the database connection
const bodyParser = require('body-parser');

const passport = require('./auth'); // Import the passport configuration for authentication
app.use(passport.initialize()); // Initialize passport for authentication
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

//Middleware function...
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Requset Made by: ${req.originalUrl}`);
    //${new Date().toLocaleString()} to get the time and print in local format. ||   ${req.originalUrl}
    next(); //Move on to the next phase
}

//Apply Middleware to all Routes
app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res) => {
    res.send("welcome to the hotel ... \nhow can I help you?");
})

//Import the route file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
}); 