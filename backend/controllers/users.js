const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const User = require('../models/Users');
const { validationResult } = require('express-validator');

// @desc      POST user
// @route     POST /v1/api/users/
// @access    Public
exports.createUser = async (req, res) => {
  console.log('requestesd');
  try {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const { name, email, password } = req.body;

    // const user= new User({name,email,password,avatar})

    //see if user exists
    let user = await User.find({ email });

    if (user.length > 0) {
      // console.log(user);
      return res.status(401).json([{ msg: 'User Exists' }]);
    }

    //use gravatar
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'robohash' });

    user = new User({ name, email, password, avatar });

    //encrypt password
    const salt = 10;

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //return json token
    const jwtSecret = config.get('jwtSecret');

    const token = jwt.sign({ payload: user.id }, jwtSecret, {
      expiresIn: 350000,
    });

    console.log('user Saved');
    res.json({ token: token, msg: 'User Created' });
  } catch (error) {
    console.log('server error in creating USER...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};
