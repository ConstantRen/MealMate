const express = require('express');

const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Define routes for recipes
router.post('/', createRecipe);
router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipeById);
router.put('/:recipeId', updateRecipe);
router.delete('/:recipeId', deleteRecipe);

module.exports = router;
