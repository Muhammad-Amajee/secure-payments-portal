import React, { useState } from 'react';
import { registerUser } from '../services/api'; // Import your API service function
import { TextField, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../App.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom';

const validateInput = (input, type) => {
  const regex = {
    username: /^[a-zA-Z0-9_]{5,20}$/, // Username must be alphanumeric with underscores, 5-20 chars
    password: /^[a-zA-Z0-9!@#$%^&*]{8,20}$/, // Password allows special characters, 8-20 chars
    accountNumber: /^[0-9]{8,20}$/, // Account number must be numeric, 8-20 digits
    name: /^[a-zA-Z\s]{2,50}$/, // Name must contain only letters and spaces, 2-50 chars
    idNumber: /^[0-9]{5,20}$/, // ID Number must be numeric, 5-20 digits 
  };
  return regex[type]?.test(input) || false;
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    accountNumber: '',
    name: '',
    idNumber: '',
    role: 'customer',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false); // State to control the dialog
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!validateInput(formData.username, 'username')) {
      errors.username = 'Username must be 5-20 characters long and alphanumeric with underscores allowed.';
    }
    if (!validateInput(formData.password, 'password')) {
      errors.password = 'Password must be 8-20 characters long and can include special characters.';
    }
    if (!validateInput(formData.accountNumber, 'accountNumber')) {
      errors.accountNumber = 'Account number must be numeric and between 8-20 digits.';
    }
    if (!validateInput(formData.name, 'name')) {
      errors.name = 'Name must be 2-50 characters long and contain only letters and spaces.';
    }
    if (!validateInput(formData.idNumber, 'idNumber')) {
      errors.idNumber = 'ID Number must be numeric and between 5-20 digits.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser(formData);
      console.log('User registered:', response);
      setOpen(true); // Open the dialog on successful registration
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="register-container">
      {/* Left Section with background image */}
      <div className="register-left">
        <div className="">
          <h1 className='welcome-text'>Ready to take the next step? <span className='welcome-message'>Create your account now!</span></h1>
        </div>
      </div>

      {/* Right Section with registration form */}
      <div className="register-right">
        <div className="register-form-container">
          <h2 className="heading">Create Account</h2>
          <div className="link-container">
            <Link to="/login" className="link-inactive">Login</Link>
            <Link to="/register" className="link-active">Sign Up</Link>
          </div>
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
              id="username"
              label="Username"
              variant="standard"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
              error={!!validationErrors.username}
              helperText={validationErrors.username}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              error={!!validationErrors.password}
              helperText={validationErrors.password}
            />
            <TextField
              id="accountNumber"
              label="Account Number"
              variant="standard"
              value={formData.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              required
              error={!!validationErrors.accountNumber}
              helperText={validationErrors.accountNumber}
            />
            <TextField
              id="name"
              label="Name"
              variant="standard"
              value={formData.name}
              name="name"
              onChange={handleChange}
              required
              error={!!validationErrors.name}
              helperText={validationErrors.name}
            />
            <TextField
              id="idNumber"
              label="ID Number"
              variant="standard"
              value={formData.idNumber}
              name="idNumber"
              onChange={handleChange}
              required
              error={!!validationErrors.idNumber}
              helperText={validationErrors.idNumber}
            />
            <Button
              className="button-styling"
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Box>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have successfully registered. Click the button below to go to the login page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;