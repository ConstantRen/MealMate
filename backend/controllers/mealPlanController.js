const mongoose = require('mongoose');
const MealPlan = require('../models/MealPlan');

// Get user's meal plans
exports.getUserMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ userId: req.user.id });
        res.status(200).json(mealPlans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meal plans' });
    }
};

// Create a new meal plan
exports.createMealPlan = async (req, res) => {
    try {
        const { date, recipeIds, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!Array.isArray(recipeIds) || recipeIds.length === 0) {
            return res.status(400).json({ message: 'At least one recipe ID is required' });
        }

        // Creating the meal plan with multiple recipe IDs
        const mealPlan = new MealPlan({
            date,
            userId,
            recipes: recipeIds, // Save multiple recipes
        });

        await mealPlan.save();
        res.status(201).json(mealPlan);
    } catch (error) {
        console.error('Error creating meal plan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing meal plan
exports.updateMealPlan = async (req, res) => {
  try {
    const { mealPlanId } = req.params; // Fetch the mealPlanId from the request parameters
    const updateData = req.body;

    // Check if mealPlanId is valid
    if (!mealPlanId || !mongoose.Types.ObjectId.isValid(mealPlanId)) {
      return res.status(400).json({ message: 'Invalid meal plan ID' });
    }

    // Proceed with update if valid
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(mealPlanId, updateData, { new: true });

    if (!updatedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.json(updatedMealPlan);
  } catch (error) {
    console.error('Error updating meal plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete a meal plan
exports.deleteMealPlan = async (req, res) => {
    const { id } = req.params;

    try {
        const mealPlan = await MealPlan.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found or unauthorized' });
        }

        res.status(200).json({ message: 'Meal plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting meal plan' });
    }
};
