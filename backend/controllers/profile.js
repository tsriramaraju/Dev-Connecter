const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const axios = require('axios');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
exports.getProfile = async (req, res) => {
  const userId = req.user._id;
  console.log('Request for get current User profile');

  try {
    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'name avatar email'
    );
    res.json(profile);
  } catch (error) {
    console.log('server error in fetching personal Profile...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
exports.postProfile = async (req, res) => {
  console.log('Request for create/update profile');
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;
  const profileFields = { user: req.user._id, social: {} };
  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills)
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = facebook;

  const profile = new Profile(profileFields);

  try {
    const profileExists = await Profile.exists({ user: profileFields.user });
    console.log(profileExists);
    if (profileExists) {
      const result = await Profile.findOneAndUpdate(
        { user: profileFields.user },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json({ message: 'updated', result: result });
    } else {
      const result = await profile.save();
      res.json({ message: 'saved', result: result });
    }
  } catch (error) {
    console.log('server error in creating/Updating Profile...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
exports.getProfiles = async (req, res) => {
  console.log('Request for get all profiles');
  try {
    const profiles = await Profile.find().populate('user', 'name avatar email');
    res.json(profiles);
  } catch (error) {
    console.log('server error in fetching all Profile...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
exports.getIndividualProfile = async (req, res) => {
  console.log('Request for get individual profile');
  const userId = req.params.user_id;
  try {
    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'name avatar email'
    );
    res.json(profile);
  } catch (error) {
    console.log('server error in fetching individual Profile...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
exports.deleteProfile = async (req, res) => {
  const userId = req.user._id;
  console.log('Request for delete profile');
  try {
    const result = await Profile.deleteOne({ user: userId });
    res.json(result);
  } catch (error) {
    console.log('server error in deleting Profile...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
exports.addExperience = async (req, res) => {
  console.log('Request for add experience');
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const expFields = req.body;
    const profile = await Profile.findOne({ user: req.user._id });
    profile.experience.unshift(expFields);

    const result = await profile.save();

    res.json(result);
  } catch (error) {
    console.log('server error in adding experience...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
exports.deleteExpereince = async (req, res) => {
  const expId = req.params.exp_id;
  console.log('Request for delete experience');

  try {
    const profile = await Profile.findOne({ user: req.user._id });
    const experience = profile.experience.filter((exp) => exp._id != expId);
    profile.experience = experience;
    const result = await profile.save();

    res.json(result);
  } catch (error) {
    console.log('server error in deleting experience...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
exports.addEducation = async (req, res) => {
  console.log('Request for add education');
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  try {
    const eduFields = req.body;
    const profile = await Profile.findOne({ user: req.user._id });
    profile.education.unshift(eduFields);

    const result = await profile.save();

    res.json(result);
  } catch (error) {
    console.log('server error in adding education...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
exports.deleteEducation = async (req, res) => {
  console.log('Request for delete education');
  const eduId = req.params.edu_id;

  try {
    const profile = await Profile.findOne({ user: req.user._id });
    const education = profile.education.filter((edu) => edu._id != eduId);
    profile.education = education;
    const result = await profile.save();

    res.json(result);
  } catch (error) {
    console.log('server error in deleting education...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
exports.getRepos = async (req, res) => {
  console.log('Request for get repos');
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
    };

    const gitHubResponse = await axios.get(uri, { headers });

    res.json(gitHubResponse.data);
  } catch (error) {
    console.log('server error in retrieving Repos...\n' + error);
    res.status(500).json([{ msg: 'Sever Error' }]);
  }
};
