import axios from 'axios';

const API_URL = 'https://localhost:5000/api'; // The base URL for your backend

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Create a new payment
export const makePayment = async (paymentData, token) => {
  try {
    const response = await axios.post(`${API_URL}/payments`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};
