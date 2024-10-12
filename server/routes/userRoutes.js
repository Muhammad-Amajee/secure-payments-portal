const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, accountNumber, name, idNumber } = req.body;

  // Log received data for debugging
  console.log(req.body);

  if (!username || !password || !accountNumber || !name || !idNumber) {
    return res.status(400).send('All fields are required');
  }

  const user = new User({ username, password, accountNumber, name, idNumber });
  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password, accountNumber } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.accountNumber !== accountNumber || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials or account number');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
    });

    res.send({ message: 'Login successful', role: user.role }); // Include role in the response
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logout successful' });
});

module.exports = router;
