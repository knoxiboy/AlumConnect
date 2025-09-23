const User = require('../models/User');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Not authorized as ${roles.join(' or ')}` });
    }

    next();
  };
};

module.exports = { authorize };