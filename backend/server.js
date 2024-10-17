const express = require('express');
const path = require('path');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); 
const mealLogRoutes = require('./routes/mealLogRoutes'); 
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

// Serve static files (for CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the auth routes
app.use('/', authRoutes);

// Use meal plan routes
app.use('/mealPlans', mealPlanRoutes);

// Use profile routes
app.use('/profile', profileRoutes);
// Use recipe routes with a base path
app.use('/recipes', recipeRoutes);

// Use the meal log routes
app.use('/meal-logs', mealLogRoutes);

// Serve HTML pages using EJS (converted versions)
app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home Page' });
});

app.get('/recipes', (req, res) => {
  res.render('recipe', { pageTitle: 'Recipe Discovery' });
});

app.get('/signin', (req, res) => {
  res.render('signIN');  // Render signIN.ejs
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Define the server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
