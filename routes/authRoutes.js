const express = require('express');
const { registerUser, updateUserProfile } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.put('/update', updateUserProfile); // Or whatever endpoint you need

module.exports = router;