const { firestore } = require('../config/firebase');
const {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  arrayUnion
} = require('firebase/firestore');

// Create a new meal plan
const createMealPlan = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body

  const { userId, title, description, startDate, endDate, meals } = req.body;

  // Check for missing fields
  if (!userId || !title || !description || !startDate || !endDate || !meals) {
    return res.status(400).json({
      message: "All fields are required (userId, title, description, startDate, endDate, meals)."
    });
  }

  try {
    // Create the meal plan
    const mealPlanRef = await addDoc(collection(firestore, 'mealPlans'), {
      userId,
      title,
      description,
      startDate,
      endDate,
      meals
    });

    // Update the user's document with the new meal plan ID
    const userRef = doc(firestore, 'users', userId);
    
    // Use updateDoc to ensure mealPlanIds array exists
    await updateDoc(userRef, {
      mealPlanIds: arrayUnion(mealPlanRef.id) // Adds the new meal plan ID to the user's mealPlanIds array
    });

    res.status(201).json({ message: "Meal plan created successfully", mealPlanId: mealPlanRef.id });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all meal plans for a specific user
const getAllMealPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    const mealPlansQuery = query(collection(firestore, 'mealPlans'), where('userId', '==', userId));
    const mealPlansSnapshot = await getDocs(mealPlansQuery);
    const mealPlans = mealPlansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ mealPlans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific meal plan by its ID
const getMealPlanById = async (req, res) => {
  const { mealPlanId } = req.params;

  try {
    const mealPlanDoc = await getDoc(doc(firestore, 'mealPlans', mealPlanId));
    if (mealPlanDoc.exists()) {
      res.status(200).json({ mealPlan: mealPlanDoc.data() });
    } else {
      res.status(404).json({ message: "Meal plan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a meal plan by its ID
const updateMealPlan = async (req, res) => {
  const { mealPlanId } = req.params;
  const { title, description, startDate, endDate, meals } = req.body;

  try {
    const mealPlanRef = doc(firestore, 'mealPlans', mealPlanId);
    await updateDoc(mealPlanRef, { title, description, startDate, endDate, meals });
    res.status(200).json({ message: "Meal plan updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a meal plan by its ID
const deleteMealPlan = async (req, res) => {
  const { mealPlanId } = req.params;

  try {
    await deleteDoc(doc(firestore, 'mealPlans', mealPlanId));
    res.status(200).json({ message: "Meal plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMealPlan, getAllMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan };
