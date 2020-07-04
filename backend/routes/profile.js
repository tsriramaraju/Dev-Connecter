const express = require('express');
const { getProfile } = require('../controllers/profile');

const router = express.Router();

router.route('/').get(getProfile);

module.exports = router;
