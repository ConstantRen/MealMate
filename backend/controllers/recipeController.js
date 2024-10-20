const multer = require('multer');
const Recipe = require('../models/Recipe');

// Set up Multer storage configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the image filename
    }
});

const upload = multer({ storage: storage }).single('image'); // Configure for single image upload

// Add a new recipe
exports.addRecipe = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Image upload failed', error: err.message });
        }

        const { title, cuisine, ingredients, instructions, nutritionalInfo } = req.body;

        try {
            // Create a new recipe instance with image path if available
            const newRecipe = new Recipe({
                title,
                cuisine,
                image: req.file ? req.file.path : null, // Save the image path if uploaded
                ingredients,
                instructions,
                nutritionalInfo,
            });

            // Save the recipe to the database
            const savedRecipe = await newRecipe.save();
            res.status(201).json({ message: 'Recipe added successfully', recipe: savedRecipe });
        } catch (error) {
            res.status(500).json({ message: 'Error adding recipe', error: error.message });
        }
    });
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error: error.message });
    }
};

// Get a specific recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id); // Find recipe by its ID

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe); // Ensure this returns the expected structure
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

// Update a recipe by ID (including updating image)
exports.updateRecipe = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Image upload failed', error: err.message });
        }

        const { id } = req.params;
        const updatedData = req.body;

        try {
            // If a new image is uploaded, add its path to the updated data
            if (req.file) {
                updatedData.image = req.file.path;
            }

            // Find the recipe by ID and update it
            const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedRecipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
        } catch (error) {
            res.status(500).json({ message: 'Error updating recipe', error: error.message });
        }
    });
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the recipe by ID and remove it
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
};
