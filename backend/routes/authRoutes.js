const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Adjust path as necessary

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateUserProfile); // Protect this route with authMiddleware

module.exports = router;
