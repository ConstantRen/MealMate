const mongoose = require('mongoose');

// Define a schema for the nutritional information
const NutritionalInfoSchema = new mongoose.Schema({
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fiber: { type: Number },
    sugars: { type: Number },
});

// Define the main recipe schema with an image field
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cuisine: { type: String, required: true },
    image: { type: String }, // URL or path to the image
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true }, // e.g., '2 cups', '1 tsp'
        },
    ],
    instructions: { type: String, required: true },
    nutritionalInfo: NutritionalInfoSchema, // Reference the nutritional information schema
});

// Export the Recipe model
module.exports = mongoose.model('Recipe', RecipeSchema);
