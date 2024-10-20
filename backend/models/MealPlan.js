const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], // Store multiple recipe IDs
    // Add other fields as needed
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);