const { firebase } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(403).send('No token provided.');
  }

  try {
    const decodedToken = await firebase.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

module.exports = verifyToken;
