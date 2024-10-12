const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/auth/check', authenticate, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;