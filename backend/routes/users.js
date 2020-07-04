const express = require('express');
const { createUser } = require('../controllers/users');
const router = express.Router();
const { body } = require('express-validator');

router.route('/').post(
  [
    body('name', 'please enter some values').not().isEmpty(),
    body('email', 'enter Valid Email').isEmail(),
    body('password', 'Password must be min 6 characters').isLength({
      min: 6,
    }),
  ],
  createUser
);

module.exports = router;
