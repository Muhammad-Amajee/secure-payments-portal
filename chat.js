// Models
// Below is my Payment.js model
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  payeeAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  swiftCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
//Below is my User.js model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  idNumber: { type: String, required: true },
});

// Hash password before saving the user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);

//Routes
//Below is my userRoutes.js
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
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if user exists and accountNumber matches
    if (!user || user.accountNumber !== accountNumber || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials or account number');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

//Below is my paymentRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/payments', authenticate, async (req, res) => {
  const { payeeAccount, amount, currency, swiftCode } = req.body;

  // Assuming req.user contains the authenticated user after middleware checks
  const payer = req.user.userId;

  try {
    // Create a new payment document
    const newPayment = new Payment({
      payer,
      payeeAccount,
      amount,
      currency,
      swiftCode,
    });

    // Save the payment to the database
    await newPayment.save();
    res.status(201).json({ message: 'Payment details stored successfully', payment: newPayment });
  } catch (error) {
    console.error('Payment storage error:', error);
    res.status(500).json({ message: 'Failed to store payment details' });
  }
});

module.exports = router;

//Below is my server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/paymentsDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
