const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.isAuth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    const tokenData = jwt.verify(token, config.get('jwtSecret'));
    const userId = tokenData.payload;

    const isMatch = await User.exists({ _id: userId });

    if (!isMatch) {
      return res.status(401).json([{ msg: 'Authentication Token is Invalid' }]);
    } else {
      const user = await User.find({ _id: userId }).select('-password');

      req.user = user;
      next();
    }
  } else {
    return res.status(401).json([{ msg: 'Authentication Token not found' }]);
  }
};
