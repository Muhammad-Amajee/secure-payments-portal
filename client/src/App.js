import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import axios from 'axios';
import StaffPortal from './components/StaffPortal';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated by making a request to a protected route
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/auth/check', { withCredentials: true });
        if (response.data.authenticated) {
          setToken(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setToken(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={token ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/staff-portal" element={token ? <StaffPortal /> : <Navigate to="/login" />} /> {/* Add this route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

