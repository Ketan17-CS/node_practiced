const express = require('express');
const router = express();

const Person = require('./../schema/Persons'); // Import the Person model
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
//Post method to store a new person in the database
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; //Assuming the request body contains the persons data.
        // create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to databse
        const response = await newPerson.save();
        console.log('data saved.');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));

        // Generate a JWT token for the new person
        const token = generateToken(payload);
        console.log('JWT token generated:', token);

        res.status(200).json({ response: response, token: token }); // Send the saved person and token as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; // Get username and password from request body

        // Find the user in the database
        const user = await Person.findOne({ username: username });

        // If user not found or password does not match, return an error
        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        res.json({ token })
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

//Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userDate = req.user; // Get the user data from the request object
        console.log('User data:', userDate);

        const userID = userDate.id; // Extract the user ID from the user data
        const user = await Person.findById(userID); // Find the user in the database by ID

        res.status(200).json({ user }); // Send the user data as a JSON response
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

//Get method to fetch persons from the database
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const persons = await Person.find(); // Fetch all persons from the database
        console.log('data fetched.');
        res.status(200).json(persons); // Send the persons as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

router.get('/:workType', async (req, res) => {
    const workType = req.params.workType; // Get the work type from the request parameters
    if (workType == 'softwareEngineer' || workType == 'Doctor' || workType == 'Teacher' || workType == 'Artist') {
        const response = await Person.find({ work: workType });
        console.log('response fetched.');
        res.status(200).json(response); // Send the response as a JSON
    } else {
        res.status(404).json({ error: 'Invalid work type.' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Get the ID from the request parameters
        const updatedPersonData = req.body; // Get the updated data from the request body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        }) // Update the person with the given ID
        if (!response) {
            return res.status(404).json({ error: 'Person not found.' });
        }
        console.log('data updated.');
        res.status(200).json(response); // Send the updated person as a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Get the ID from the request parameters
        const response = await Person.findByIdAndDelete(personId); // Delete the person with the given ID
        if (!response) {
            return res.status(404).json({ error: 'Person not found.' });
        }
        console.log('data deleted.');
        res.status(200).json({ message: 'Person deleted successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
})
// Export the router to use in the main server file
module.exports = router;