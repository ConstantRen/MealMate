// routes/mealPlanRoutes.js
const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get user's meal plans
router.get('/mealPlan', authMiddleware.verifyToken, mealPlanController.getUserMealPlans);

// Create a new meal plan
router.post('/mealPlan', authMiddleware.verifyToken, mealPlanController.createMealPlan);

// Update an existing meal plan
router.put('/mealPlan/:id', authMiddleware.verifyToken, mealPlanController.updateMealPlan);

// Delete a meal plan
router.delete('/mealPlan/:id', authMiddleware.verifyToken, mealPlanController.deleteMealPlan);

module.exports = router;
