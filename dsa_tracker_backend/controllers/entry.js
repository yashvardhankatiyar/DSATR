const model = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = model.User;

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const user = new User({ ...req.body, password: hashedPassword });
    const token = jwt.sign({ email: req.body.email }, process.env.KEY, {
      algorithm: 'HS256',
    });

    user.token = token;

    await user.save();
    res.status(201).json({ token });
  } catch (err) {
    console.log("error -> ", err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (validPassword) {
      const token = jwt.sign({ email: req.body.email, username: user.username }, process.env.KEY, {
        algorithm: 'HS256',
      });

      user.token = token;
      await user.save();

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.log("error -> ", err);
    res.status(500).json({ message: 'Error logging in' });
  }
};
