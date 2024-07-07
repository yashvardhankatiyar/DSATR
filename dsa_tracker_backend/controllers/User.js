const jwt = require('jsonwebtoken');
const model = require('../Models/User'); // Adjust the path as necessary
const User  = model.User;
require('dotenv').config();

exports.getUser = async (req, res) => {
  const header = req.get('Authorization');
  
  if (!header) {
    return res.status(401).json({ message: 'Access denied. No Authorization header provided.' });
  }

  const token = header.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY); // Ensure process.env.KEY is defined in your .env file
    req.user = decoded;
    const user = await User.findOne({ email: req.user.email }); // Fetch user details from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username, email: user.email, attemptQuestion: user.attemptedQuestion });
  } catch (err) {
    console.log('error -> ', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.attemptingPatch = async (req, res) => {
  const header = req.get('Authorization');
  
  if (!header) {
    return res.status(401).json({ message: 'Access denied. No Authorization header provided.' });
  }

  const token = header.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY); // Ensure process.env.KEY is defined in your .env file
    req.user = decoded;
    const { questionId, status } = req.body;

    const updateQuery = status === 'complete'
      ? { $addToSet: { attemptedQuestion: questionId } } // Add to array if not already present
      : { $pull: { attemptedQuestion: questionId } };    // Remove from array

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      updateQuery,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username, email: user.email, attemptQuestion: user.attemptedQuestion });
  } catch (err) {
    console.log('error -> ', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};
