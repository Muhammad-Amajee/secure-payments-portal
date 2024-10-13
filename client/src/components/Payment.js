import React, { useState } from 'react';
import { makePayment } from '../services/api'; // Import your API service function
import { TextField, Box, Button } from '@mui/material'; // Import Material-UI components
import '../App.css'; // Import your CSS styles

// Function to validate input using regex patterns
const validateInput = (input, type) => {
  const regex = {
    payeeAccount: /^[a-zA-Z0-9_]{5,20}$/, // Example regex for Payee Account: 5-20 chars, alphanumeric with underscores
    amount: /^\d+(\.\d{1,2})?$/, // Amount can be a number with optional 2 decimal places
    currency: /^[A-Z]{3}$/, // Currency should be 3 uppercase letters (like USD, EUR)
    swiftCode: /^[A-Z]{6}[0-9A-Z]{2}([A-Z0-9]{3})?$/, // SWIFT Code format
  };
  return regex[type]?.test(input) || false;
};

const Payment = ({ token }) => {
  const [paymentData, setPaymentData] = useState({
    payeeAccount: '',
    amount: '',
    currency: '',
    swiftCode: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({}); // To track validation errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' }); // Clear validation error on change
  };

  // Validate the form inputs before submitting
  const validateForm = () => {
    const errors = {};
    if (!validateInput(paymentData.payeeAccount, 'payeeAccount')) {
      errors.payeeAccount = 'Payee Account must be 5-20 characters long and can include letters, numbers, and underscores.';
    }
    if (!validateInput(paymentData.amount, 'amount')) {
      errors.amount = 'Amount must be a valid number with up to two decimal places.';
    }
    if (!validateInput(paymentData.currency, 'currency')) {
      errors.currency = 'Currency must be a 3-letter uppercase code (e.g., USD).';
    }
    if (!validateInput(paymentData.swiftCode, 'swiftCode')) {
      errors.swiftCode = 'SWIFT Code must be in a valid format.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Do not submit if validation fails
    }

    try {
      const response = await makePayment(paymentData, token);
      console.log('Payment successful:', response);
      setSuccessMessage('Payment was successful!'); // Show success message
      setPaymentData({ payeeAccount: '', amount: '', currency: '', swiftCode: '' }); // Reset form
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.'); // Show error message
    }
  };

  return (
    <main className="main-container">
      <div className="card">
        <h2 className="heading">Make a Payment</h2>
        <div className="w-full">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { mt: 2, mb: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="payee-account"
              label="Payee Account"
              variant="standard"
              name="payeeAccount"
              value={paymentData.payeeAccount}
              onChange={handleChange}
              required
              error={!!validationErrors.payeeAccount} // Show error if payee account is invalid
              helperText={validationErrors.payeeAccount} // Display validation error message
            />
            <TextField
              id="amount"
              label="Amount"
              variant="standard"
              type="number"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              required
              error={!!validationErrors.amount} // Show error if amount is invalid
              helperText={validationErrors.amount} // Display validation error message
            />
            <TextField
              id="currency"
              label="Currency"
              variant="standard"
              name="currency"
              value={paymentData.currency}
              onChange={handleChange}
              required
              error={!!validationErrors.currency} // Show error if currency is invalid
              helperText={validationErrors.currency} // Display validation error message
            />
            <TextField
              id="swift-code"
              label="SWIFT Code"
              variant="standard"
              name="swiftCode"
              value={paymentData.swiftCode}
              onChange={handleChange}
              required
              error={!!validationErrors.swiftCode} // Show error if swift code is invalid
              helperText={validationErrors.swiftCode} // Display validation error message
            />
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button className="button-styling" variant="contained" color="primary" type="submit">
              Make Payment
            </Button>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default Payment;
