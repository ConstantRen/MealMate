const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
const app = express();

// Middleware to serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Serve your HTML files
app.get('/pages', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/pages/signIn', (req, res) => {
    res.sendFile(__dirname + '/public/signIN.html');
});

app.get('/pages/recipe', (req, res) => {
    res.sendFile(__dirname + '/public/recipe.html');
});

app.get('/pages/mealPlan', (req, res) => {
    res.sendFile(__dirname + '/public/mealPlan.html');
});

// Use the auth and meal plan routes
app.use('/', userRoutes); // Auth routes
app.use('/', mealPlanRoutes); // Meal plan routes
app.use('/', recipeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});