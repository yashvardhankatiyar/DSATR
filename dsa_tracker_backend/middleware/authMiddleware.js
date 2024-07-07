const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req, res, next) => {
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
    next();
  } catch (err) {
    console.log('error -> ', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
