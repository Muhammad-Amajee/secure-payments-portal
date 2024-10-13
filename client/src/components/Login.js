import React, { useState } from 'react';
import { loginUser } from '../services/api';
import PropTypes from 'prop-types';
import { TextField, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { validationMessages } from '../validationMessages';
import '../App.css'; // Assuming this is where the styles are applied

export const validateInput = (input, type) => {
  const regex = {
    username: /^\w{5,20}$/, // Username must be alphanumeric with underscores, 5-20 chars
    password: /^[a-zA-Z0-9!@#$%^&*]{8,20}$/, // Password allows special characters, 8-20 chars
    accountNumber: /^\d{8,20}$/, //Account number must be numeric, 8-20 digits
  };
  return regex[type]?.test(input) || false;
};

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [credentialError, setCredentialError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!validateInput(username, 'username')) {
      errors.username = validationMessages.username; // Use validation message from constants
    }
    // if (!validateInput(password, 'password')) {
    //   errors.password = validationMessages.pwdValidation; // Use validation message from constants
    // }
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await loginUser({ username, password, accountNumber });
      setToken(true);
      if (response.role === 'employee') {
        navigate('/staff-portal'); // Redirect to staff portal if employee
      } else {
        navigate('/payment'); // Redirect to payment page if customer
      }
    } catch (error) {
      setCredentialError('Invalid username or password');
      setIsLoading(false);
    }
  };

  const getPasswordValidationColor = () => {
    return password.length >= 8 ? 'green' : 'red';
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="welcome-message">
          <h1 className='welcome-text'>Welcome to Your <span className='welcome-message'> Personalized Banking Experience</span></h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="heading">My Account</h2>
          <div className="link-container">
            <Link to="/login" className="link-active">Login</Link>
            <Link to="/register" className="link-inactive">Sign Up</Link>
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
              id="email-address"
              label="Username"
              variant="standard"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.target.value);
                setValidationErrors({ ...validationErrors, username: '' });
              }}
              error={!!validationErrors.username}
              helperText={validationErrors.username || ''}
            />
            <TextField
              id="account-number"
              label="Account Number"
              variant="standard"
              required
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setValidationErrors({ ...validationErrors, accountNumber: '' });
              }}
              error={!!validationErrors.accountNumber}
              helperText={validationErrors.accountNumber || ''}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors({ ...validationErrors, password: '' });
              }}
              // error={!!validationErrors.password}
              helperText={validationErrors.password || ''}
            />
            <p style={{ color: getPasswordValidationColor() }}>
              Password must be 8-20 characters long and can include special characters.
            </p>
            {credentialError && (
              <div className="error-message">
                {credentialError}
              </div>
            )}
            <Button className="button-styling" variant="contained" color="primary" type="submit" disabled={isLoading} fullWidth>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;