const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const fs = require('fs');
const https = require('https');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser()); // Use cookie-parser middleware

// CORS configuration
const corsOptions = {
  origin: 'https://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/paymentsDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api', paymentRoutes);
app.use('/api', routes);

// Read SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../client/secure-payments-portal-client/localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../client/secure-payments-portal-client/localhost.crt')),
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(5000, () => {
  console.log('Server running on port 5000 with HTTPS');
});

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    // Request was via https, so do no special handling
    next();
  } else {
    // Request was via http, so redirect to https
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});