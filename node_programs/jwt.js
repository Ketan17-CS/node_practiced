const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //first check requset header has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ message: 'Token Not Found.' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
    if (!token)
        return res.status(401).json({ message: 'Unauthorized access. No token provided.' });
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token.' });
    }
}

// Function to generate a JWT token
const generateToken = (user) => {
    // generate a new JWT token using user data
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
};