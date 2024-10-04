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
  arrayUnion,
  arrayRemove,
} = require('firebase/firestore');

// Create a new meal plan
const createMealPlan = async (req, res) => {
  const { userId, title, description, startDate, endDate, meals } = req.body;

  if (!userId || !title || !description || !startDate || !endDate || !meals) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const mealPlanRef = await addDoc(collection(firestore, 'mealPlans'), {
      userId,
      title,
      description,
      startDate,
      endDate,
      meals,
    });

    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      mealPlanIds: arrayUnion(mealPlanRef.id),
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

    if (mealPlans.length > 0) {
      res.status(200).json({ mealPlans });
    } else {
      res.status(404).json({ message: "No meal plans found for this user." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific meal plan by its ID
const getMealPlanById = async (req, res) => {
  const { mealPlanId } = req.params;
  console.log("MealPlan ID received:", mealPlanId); // Add this line to log the ID

  try {
    const mealPlanDoc = await getDoc(doc(firestore, 'mealPlans', mealPlanId));
    if (mealPlanDoc.exists()) {
      res.status(200).json({ mealPlan: { id: mealPlanDoc.id, ...mealPlanDoc.data() } }); // Include the ID in the response
    } else {
      res.status(404).json({ message: "Meal plan not found" });
    }
  } catch (error) {
    console.error("Error retrieving meal plan:", error);
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

// Delete a meal plan by its ID and update the user's mealPlanIds
const deleteMealPlan = async (req, res) => {
  const { mealPlanId } = req.params; // Get mealPlanId from request parameters
  const { userId } = req.body; // Assuming userId is passed in the request body

  try {
    // Reference to the meal plan document
    const mealPlanDocRef = doc(firestore, 'mealPlans', mealPlanId);

    // Delete the meal plan document
    await deleteDoc(mealPlanDocRef);

    // Reference to the user document
    const userDocRef = doc(firestore, 'users', userId);

    // Update the user's mealPlanIds array by removing the deleted mealPlanId
    await updateDoc(userDocRef, {
      mealPlanIds: arrayRemove(mealPlanId) // Use arrayRemove to remove the meal plan ID
    });

    return res.status(200).json({ message: 'Meal plan deleted successfully and user updated' });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createMealPlan, getAllMealPlans, getMealPlanById, updateMealPlan, deleteMealPlan };
