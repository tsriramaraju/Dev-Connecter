const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const { validationResult } = require('express-validator');

// @desc      get User details
// @route     GET /v1/api/auth/
// @access    Private
exports.getUser = (req, res) => {
  console.log('Request for get Users');
  res.json({ user: req.user });
};

// @desc      User Login
// @route     POST /v1/api/auth/
// @access    public
exports.login = async (req, res) => {
  console.log('Request for user login');
  try {
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const isEmailExists = await User.exists({ email });

    if (!isEmailExists)
      return res.status(400).json([{ msg: 'Email doesnt Exist' }]);

    const user = await User.findOne({ email });
    const hashPassword = user.password;
    const jwtSecret = config.get('jwtSecret');

    const token = jwt.sign({ payload: user.id }, jwtSecret, {
      expiresIn: 350000,
    });

    bcrypt.compare(password, hashPassword, (err, result) => {
      if (err) throw err;
      if (!result)
        return res.status(400).json([{ msg: 'password dont match' }]);
      res.json({ token: token, msg: 'Logged in Sucessfully' });
    });
  } catch (error) {
    console.log('server error in creating USER...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};
