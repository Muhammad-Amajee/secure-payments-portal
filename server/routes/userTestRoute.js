const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this points to your User model

// A test route to create a new user in MongoDB
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
