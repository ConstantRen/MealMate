// routes/mealPlanRoutes.js
const express = require('express');
const { getMealPlans, updateMealPlan } = require('../controllers/mealPlanController');
const router = express.Router();

// Define the routes
router.get('/:userId', getMealPlans); // Get meal plans for a specific user
router.put('/:mealPlanId', updateMealPlan); // Update a specific meal plan

module.exports = router;
