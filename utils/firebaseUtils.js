const { firestore } = require('../config/firebase');

// Example: Get user-specific data
const getUserMealPlans = async (userId) => {
  const snapshot = await firestore.collection('mealPlans').where('userId', '==', userId).get();
  const mealPlans = [];
  snapshot.forEach(doc => mealPlans.push(doc.data()));
  return mealPlans;
};

module.exports = { getUserMealPlans };
