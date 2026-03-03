const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req,res) => {
  const { name,email,password,jobTitle,joiningDate } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ message: 'Email already registered.' });

    const user = await User.create({ name,email,password,jobTitle,joiningDate });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Account created successfully.',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && await user.matchPassword(password)){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({
        message: 'Login successful.',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;