const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Define RegEx patterns for validation
const usernamePattern = /^\w{5,20}$/;
const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;
const accountNumberPattern = /^\d{8,20}$/;
const namePattern = /^[a-zA-Z\s]{1,50}$/;
const idNumberPattern = /^[a-zA-Z\d]{1,20}$/;
const rolePattern = /^(employee|customer)$/;

router.post('/register', async (req, res) => {
  const { username, password, accountNumber, name, idNumber, role } = req.body;

  // Log received data for debugging
  console.log(req.body);

  // Validate input using RegEx patterns
  if (!usernamePattern.test(username)) {
    return res.status(400).send('Invalid username');
  }
  if (!passwordPattern.test(password)) {
    return res.status(400).send('Invalid password');
  }
  if (!accountNumberPattern.test(accountNumber)) {
    return res.status(400).send('Invalid account number');
  }
  if (!namePattern.test(name)) {
    return res.status(400).send('Invalid name');
  }
  if (!idNumberPattern.test(idNumber)) {
    return res.status(400).send('Invalid ID number');
  }
  if (role && !rolePattern.test(role)) {
    return res.status(400).send('Invalid role');
  }

  // Create user data object
  const userData = { username, password, accountNumber, name, idNumber };

  // Include role if it is "employee"
  if (role === 'employee') {
    userData.role = role;
  }

  const user = new User(userData);
  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password, accountNumber } = req.body;

  // Validate input using RegEx patterns
  if (!usernamePattern.test(username)) {
    return res.status(400).send('Invalid username');
  }
  if (!passwordPattern.test(password)) {
    return res.status(400).send('Invalid password');
  }
  if (!accountNumberPattern.test(accountNumber)) {
    return res.status(400).send('Invalid account number');
  }

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

    res.send({ message: 'Login successful', role: user.role, name: user.name }); // Include role in the response
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