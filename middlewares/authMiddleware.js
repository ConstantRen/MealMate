const { getAuth } = require('firebase/auth');
const { admin } = require('../config/firebase'); // Assume admin is your Firebase admin SDK initialized instance

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer scheme

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = { uid: decodedToken.uid }; // Populate req.user with uid
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
