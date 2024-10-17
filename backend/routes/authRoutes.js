const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Adjust path as necessary

const router = express.Router();

// Route to render the registration page
router.get('/register', (req, res) => {
  res.render('register'); // Ensure you have a register.ejs view
});

// Route to handle user registration
router.post('/register', registerUser);

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('signIN'); // Ensure you have a signIN.ejs view
});

// Route to handle user login
router.post('/login', loginUser);

// Route to update user profile (protected by middleware)
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
