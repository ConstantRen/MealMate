const express = require('express');
const router = express.Router();
const { createMealPlan, getAllMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan, addRecipeToMealPlan } = require('../controllers/mealPlanController');

// Create a new meal plan
router.post('/', createMealPlan);

// Get all meal plans for a specific user
router.get('/user/:userId', getAllMealPlans);

// Get a specific meal plan by its ID
router.get('/:mealPlanId', getMealPlanById);

// Update a specific meal plan by its ID
router.put('/:mealPlanId', updateMealPlan);

router.post('/add-recipe', addRecipeToMealPlan); // New route for adding a recipe

// Delete a specific meal plan by its ID
router.delete('/:mealPlanId', deleteMealPlan);

module.exports = router;
