const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Payment = require('../models/Payment'); // Import the Payment model
const router = express.Router();

const authenticate = require('../middleware/auth');

// Define RegEx patterns for validation
const payeeAccountPattern = /^[0-9]{8,20}$/;
const amountPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
const currencyPattern = /^[A-Z]{3}$/;
const swiftCodePattern = /^[A-Z0-9]{8,11}$/;

router.post('/payments', authenticate, async (req, res) => {
  const { payeeAccount, amount, currency, swiftCode } = req.body;
  const payer = req.user.userId;

  // Validate input using RegEx patterns
  if (!payeeAccountPattern.test(payeeAccount)) {
    return res.status(400).send('Invalid payee account');
  }
  if (!amountPattern.test(amount)) {
    return res.status(400).send('Invalid amount');
  }
  if (!currencyPattern.test(currency)) {
    return res.status(400).send('Invalid currency');
  }
  if (!swiftCodePattern.test(swiftCode)) {
    return res.status(400).send('Invalid SWIFT code');
  }

  try {
    // Check if the payee account exists
    const sanitizedPayeeAccount = payeeAccount.replace(/[^0-9]/g, '');

    // Check if the payee account exists
    const payee = await User.findOne({ accountNumber: sanitizedPayeeAccount });    if (!payee) {
      return res.status(404).send('Payee account not found');
    }
    
    const newPayment = new Payment({ payer, payeeAccount, amount, currency, swiftCode });
    await newPayment.save();
    res.status(201).json({ message: 'Payment details stored successfully', payment: newPayment });
  } catch (error) {
    console.error('Payment storage error:', error);
    res.status(500).json({ message: 'Failed to store payment details' });
  }
});

// Fetch payments details
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