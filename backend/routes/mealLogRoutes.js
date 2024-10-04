const express = require('express');
const { logMeal, getMeals } = require('../controllers/mealLogController.js');

const router = express.Router();

// Route for logging a meal
router.post('/logMeal', logMeal);

// Route for fetching meals by user ID
router.get('/getMeals/:userId', getMeals);

module.exports = router;
