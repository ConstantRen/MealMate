const { auth, firestore } = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { doc, setDoc, updateDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken'); // Ensure you have this package installed

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, preferences } = req.body;

  // Validate incoming data
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  try {
    // Create the user using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Store user details in Firestore
    await setDoc(doc(firestore, 'users', userId), {
      userid: userId,
      username,
      email,
      preferences: preferences || [], // Default to empty array if not provided
      savedRecipesIds: [],
      mealPlanIds: []
    });

    // Respond with user data (without password)
    res.status(201).json({ userid: userId, username, email });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Sign in the user using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate a JWT token
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token, uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { uid } = req.user; // Assume user is authenticated and uid is in req.user
  const { username, preferences, savedRecipesIds, mealPlanIds } = req.body;

  try {
    await updateDoc(doc(firestore, 'users', uid), {
      username,
      preferences,
      savedRecipesIds,
      mealPlanIds,
    });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile
};
