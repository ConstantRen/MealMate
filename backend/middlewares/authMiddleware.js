const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is provided
    if (!authHeader) {
        return res.status(403).json({ message: 'Authorization header is missing' });
    }

    // Ensure the token follows the format 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Invalid token format. Token should be sent as "Bearer <token>"' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token is either expired or invalid
            return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
        }

        // Attach the decoded user information to the request
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    });
};
