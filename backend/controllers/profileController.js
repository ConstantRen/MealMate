// controllers/profileController.js
const { firestore } = require('../config/firebase');

// Get user profile
const getUserProfile = async (req, res) => {
    const { uid } = req.user; // Get uid from authenticated user

    try {
        const userDoc = await firestore.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User profile not found.' });
        }

        const userData = userDoc.data();
        res.render('profile', { user: userData }); // Render EJS profile view
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { uid } = req.user; // Get uid from authenticated user
    const { username, preferences } = req.body;

    try {
        await firestore.collection('users').doc(uid).update({
            username,
            preferences
        });
        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
