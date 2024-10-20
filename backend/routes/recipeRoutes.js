const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Routes for recipe operations
router.post('/recipe/add', recipeController.addRecipe);
router.get('/recipe', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipeById);
router.put('/recipe/:id', recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);

module.exports = router;
