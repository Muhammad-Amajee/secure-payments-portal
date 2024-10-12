const express = require('express');
const router = express.Router();

// A basic test route to confirm server functionality
router.get('/', (req, res) => {
  res.send('Backend is working!');
});

module.exports = router;
