// In config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Retrieve the URI from environment variables
        console.log("MongoDB URI:", uri); // Optional: Check the URI in console (be cautious with logging sensitive info)
        
        await mongoose.connect(uri); // No options needed, they are default now
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
