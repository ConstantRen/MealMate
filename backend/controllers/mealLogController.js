const { firestore } = require('../config/firebase');
const { addDoc, collection, getDocs, query, where } = require('firebase/firestore');
const axios = require('axios');

// Log a Meal
const logMeal = async (req, res) => {
  const { userId, mealName, ingredients, time } = req.body;

  if (!userId || !mealName || !ingredients || !time) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Fetch nutritional info from Edamam API
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&ingr=${encodeURIComponent(ingredients)}`;
    const response = await axios.get(apiUrl);
    const nutritionalInfo = response.data;

    // Log the meal in Firestore
    await addDoc(collection(firestore, 'meal_logs'), {
      userId,
      mealName,
      ingredients,
      time,
      nutritionalInfo
    });

    res.status(201).json({ message: "Meal logged successfully", nutritionalInfo });
  } catch (error) {
    console.error("Error logging meal:", error);
    res.status(500).json({ message: "Error logging meal" });
  }
};

// Get Logged Meals for a User
const getMeals = async (req, res) => {
  const { userId } = req.params;

  try {
    const mealLogsRef = collection(firestore, 'meal_logs');
    const userMealsQuery = query(mealLogsRef, where('userId', '==', userId));
    const mealsSnapshot = await getDocs(userMealsQuery);
    const meals = mealsSnapshot.docs.map(doc => doc.data());

    res.status(200).json({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Error fetching meals" });
  }
};

module.exports = { logMeal, getMeals };
