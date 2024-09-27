const express = require('express');
const router = express.Router();
const { createMealPlan, getAllMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan } = require('../controllers/mealPlanController');

// Define the route for creating a new meal plan
router.post('/mealPlans', createMealPlan);

// Define other routes as needed
router.get('/mealPlans/:userId', getAllMealPlans);
router.get('/mealPlans/:mealPlanId', getMealPlanById);
router.put('/mealPlans/:mealPlanId', updateMealPlan);
router.delete('/mealPlans/:mealPlanId', deleteMealPlan);

module.exports = router;
