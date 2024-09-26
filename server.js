require('dotenv').config(); // Load environment variables

const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Use authentication routes
app.use('/auth', authRoutes);

const mealPlanRoutes = require('./routes/mealPlanRoutes');

app.use('/meal-plans', mealPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
