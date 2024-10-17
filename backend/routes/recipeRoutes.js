const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Import your auth middleware
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

const router = express.Router();

// Apply the auth middleware to all routes
router.use(authMiddleware);

// Define routes for recipes
router.post('/', createRecipe);         // Create a new recipe
router.get('/', getAllRecipes);          // Get all recipes
router.get('/:recipeId', getRecipeById); // Get a specific recipe by ID
router.put('/:recipeId', updateRecipe);  // Update a recipe by ID
router.delete('/:recipeId', deleteRecipe); // Delete a recipe by ID

module.exports = router;
