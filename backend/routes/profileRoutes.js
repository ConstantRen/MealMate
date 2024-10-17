// routes/profileRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get user profile (protected route)
router.get('/', authMiddleware, getUserProfile);

// Update user profile (protected route)
router.put('/', authMiddleware, updateUserProfile);

module.exports = router;
