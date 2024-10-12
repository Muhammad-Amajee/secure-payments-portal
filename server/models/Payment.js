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
