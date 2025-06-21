require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');

const db = require('./db'); // Import the database connection

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send("welcome to the hotel ... \nhow can I help you?");
})

//Import the route file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});