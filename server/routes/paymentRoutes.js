const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Payment = require('../models/Payment'); // Import the Payment model
const router = express.Router();

const authenticate = require('../middleware/auth');

router.post('/payments', authenticate, async (req, res) => {
  const { payeeAccount, amount, currency, swiftCode } = req.body;
  const payer = req.user.userId;

  try {
    const newPayment = new Payment({ payer, payeeAccount, amount, currency, swiftCode });
    await newPayment.save();
    res.status(201).json({ message: 'Payment details stored successfully', payment: newPayment });
  } catch (error) {
    console.error('Payment storage error:', error);
    res.status(500).json({ message: 'Failed to store payment details' });
  }
});


//fetch payments details
router.get('/payments', authenticate, async (req, res) => {
  try {
    const payments = await Payment.find().populate('payer', 'name accountNumber'); // Populate payer details
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Failed to fetch payment details' });
  }
});

module.exports = router;