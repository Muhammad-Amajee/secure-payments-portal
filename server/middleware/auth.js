const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log('Authenticating request...');
  const token = req.cookies.token;

  if (!token) {
    console.log('No token provided');
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    console.log('Token verified successfully');
    next();
  } catch (ex) {
    console.log('Invalid token');
    res.status(400).send('Invalid token.');
  }
};

module.exports = authenticate;