const express = require('express');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); 
const mealLogRoutes = require('./routes/mealLogRoutes'); 
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
// Use the auth routes
app.use('/auth', authRoutes);

// Use meal plan routes
app.use('/mealPlans', mealPlanRoutes);

// Use recipe routes with a base path
app.use('/recipes', recipeRoutes);

 // Using the  meal log routes
app.use('/meal-logs', mealLogRoutes); 

// Define the server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
