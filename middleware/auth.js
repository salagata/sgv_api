require("dotenv").config();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).send('Authentication required');
  }
  
  const token = authHeader.split(' ')[1];
  
  // Verify the token (simplified)
  if (token === process.env.TOKEN) {
    // Authentication successful
    next();
  } else {
    res.status(403).send('Invalid token');
  }
}

module.exports = {authenticate};