const express = require('express');
const { getUser, login } = require('../controllers/auth');
const { isAuth } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get(isAuth, getUser)
  .post(
    [
      body('email', 'enter Valid Email').isEmail(),
      body('password', 'Password must be min 6 characters').isLength({
        min: 6,
      }),
    ],
    login
  );

module.exports = router;
