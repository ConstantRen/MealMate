const { auth, firestore } = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');

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
      preferences: preferences || [],  // Default to empty array if not provided
      savedRecipesIds: [],
      mealPlanIds: []
    });

    // Respond with user data
    res.status(201).json({ userid: userId, username, email });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { uid } = req.user; // Assume user is authenticated and uid is in req.user
  const { username, preferences, savedRecipesIds, mealPlanIds } = req.body;

  try {
    await firestore.collection('users').doc(uid).update({
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

    // You can include additional logic here (e.g., generating tokens, session management)
    res.status(200).json({ message: "Login successful", uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  updateUserProfile,
  loginUser
};
