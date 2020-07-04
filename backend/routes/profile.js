const express = require('express');
const {
  getProfile,
  postProfile,
  getProfiles,
  getIndividualProfile,
  deleteProfile,
  addExperience,
  deleteExpereince,
  addEducation,
  deleteEducation,
  getRepos,
} = require('../controllers/profile');
const { isAuth } = require('../middleware/auth');

const { check } = require('express-validator');

const router = express.Router();

router
  .route('/')
  .post(
    [
      isAuth,
      [
        check('status', 'Please Enter status').not().isEmpty(),
        check('skills', 'Please Enter skills').not().isEmpty(),
      ],
    ],
    postProfile
  )
  .get(getProfiles)
  .delete(isAuth, deleteProfile);

router.route('/user/:user_id').get(getIndividualProfile);

router.route('/me').get(isAuth, getProfile);

router
  .route('/experience')
  .put(
    [
      isAuth,
      [
        check('title', 'Please enter title').not().isEmpty(),
        check('company', 'Please enter company name').not().isEmpty(),
        check('from', 'Please enter valid from').not().isEmpty(),
        check('current', 'Enter only true/false').isBoolean(),
      ],
    ],
    addExperience
  );
router.route('/experience/:exp_id').delete(isAuth, deleteExpereince);

router
  .route('/education')
  .put(
    [
      isAuth,
      [
        check('school', 'Please enter school').not().isEmpty(),
        check('degree', 'Please enter dengree').not().isEmpty(),
        check('fieldofstudy', 'Please enter field of study').not().isEmpty(),
        check('from', 'Please enter from').not().isEmpty(),
      ],
    ],
    addEducation
  );
router.route('/education/:edu_id').delete(isAuth, deleteEducation);

router.route('/github/:username').get(getRepos);

module.exports = router;
