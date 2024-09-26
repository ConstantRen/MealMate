// controllers/mealPlanController.js
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const { firestore } = require('../config/firebase');

// Function to get meal plans for a specific user
const getMealPlans = async (req, res) => {
    const userId = req.params.userId; // Get userId from request parameters
    try {
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        if (!userDoc.exists()) {
            return res.status(404).json({ message: 'User not found' });
        }
        const mealPlans = userDoc.data().mealPlanIds; // Adjust based on your Firestore structure
        res.status(200).json(mealPlans);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to update a specific meal plan
const updateMealPlan = async (req, res) => {
    const mealPlanId = req.params.mealPlanId; // Get mealPlanId from request parameters
    const updatedData = req.body; // Get updated data from the request
    try {
        await updateDoc(doc(firestore, 'mealPlans', mealPlanId), updatedData);
        res.status(200).json({ message: 'Meal plan updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Export the functions
module.exports = { getMealPlans, updateMealPlan };
