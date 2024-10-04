const { firestore } = require('../config/firebase');
const axios = require('axios');
const { doc, collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

// Fetch nutritional information from Edamam
const getNutritionalInfo = async (ingredients) => {
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(ingredients)}`;

  try {
    const response = await axios.get(url);
    return response.data; // This contains the nutritional information
  } catch (error) {
    console.error("Error fetching nutritional information from Edamam:", error);
    throw new Error("Failed to retrieve nutritional information.");
  }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { title, cuisine, ingredients, instructions } = req.body;

  if (!title || !cuisine || !ingredients || !instructions) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Fetch nutritional information
    const nutritionalInfo = await getNutritionalInfo(ingredients);

    const recipeRef = await addDoc(collection(firestore, 'recipes'), {
      title,
      cuisine,
      ingredients,
      instructions,
      nutritionalInfoId: nutritionalInfo
    });

    res.status(201).json({ message: "Recipe created successfully", recipeId: recipeRef.id, nutritionalInfo });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipesSnapshot = await getDocs(collection(firestore, 'recipes'));
    const recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific recipe by its ID
const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipeDoc = await getDoc(doc(firestore, 'recipes', recipeId));
    if (recipeDoc.exists()) {
      res.status(200).json({ recipe: recipeDoc.data() });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe by its ID
const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { title, cuisine, ingredients, instructions } = req.body;

  try {
    // Fetch updated nutritional information
    const nutritionalInfo = await getNutritionalInfo(ingredients);

    const recipeRef = doc(firestore, 'recipes', recipeId);
    await updateDoc(recipeRef, { title, cuisine, ingredients, instructions, nutritionalInfoId: nutritionalInfo });
    res.status(200).json({ message: "Recipe updated successfully", nutritionalInfo });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a recipe by its ID
const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    await deleteDoc(doc(firestore, 'recipes', recipeId));
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
