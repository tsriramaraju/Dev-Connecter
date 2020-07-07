import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { registerProfile } from '../../redux/actions/profile';
import { Link } from 'react-router-dom';

const Createprofile = ({ registerProfile, userProfile }) => {
  // useEffect(() => {
  //   effect

  // }, [])

  // const [profile, setProfile] = useState(userProfile);
  let ccompany = null;
  let cwebsite = null;
  let clocation = null;
  let cstatus = null;
  let cskills = null;
  let cgithubusername = null;
  let cbio = null;
  let ctwitter = null;
  let cfacebook = null;
  let clinkedin = null;
  let cyoutube = null;
  let cinstagram = null;
  if (userProfile) {
    ccompany = userProfile.company;
    cwebsite = userProfile.website;
    clocation = userProfile.location;
    cstatus = userProfile.status;
    cskills = userProfile.skills;
    cgithubusername = userProfile.githubusername;
    cbio = userProfile.bio;
    ctwitter = userProfile.twitter;
    cfacebook = userProfile.facebook;
    clinkedin = userProfile.linkedin;
    cyoutube = userProfile.youtube;
    cinstagram = userProfile.instagram;
  }

  const [formData, setData] = useState({
    company: ccompany ? ccompany : '',
    website: cwebsite ? cwebsite : '',
    location: clocation ? clocation : '',
    status: cstatus ? cstatus : '',
    skills: cskills ? cskills : '',
    githubusername: cgithubusername ? cgithubusername : '',
    bio: cbio ? cbio : '',
    twitter: ctwitter ? ctwitter : '',
    facebook: cfacebook ? cfacebook : '',
    linkedin: clinkedin ? clinkedin : '',
    youtube: cyoutube ? cyoutube : '',
    instagram: cinstagram ? cinstagram : '',
  });

  const onChangeHandler = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    registerProfile(formData);
  };
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const [social, setSocial] = useState(false);

  let jsxComponent = (
    <section class="container">
      <h1 class="large text-primary">
        {' '}
        {!userProfile ? 'Create Your Profile' : 'Update Your Profile'}
      </h1>
      <p class="lead">
        <i class="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={submit}>
        <div class="form-group">
          <select name="status" value={status} onChange={onChangeHandler}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small class="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChangeHandler}
          />
          <small class="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChangeHandler}
          />
          <small class="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChangeHandler}
          />
          <small class="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Skills"
            value={skills}
            onChange={onChangeHandler}
            name="skills"
          />
          <small class="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChangeHandler}
          />
          <small class="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div class="form-group">
          <textarea
            placeholder="A short bio of yourself"
            value={bio}
            onChange={onChangeHandler}
            name="bio"
          ></textarea>
          <small class="form-text">Tell us a little about yourself</small>
        </div>

        <div class="my-2">
          <button
            type="button"
            class="btn btn-light"
            onClick={(e) => {
              e.preventDefault();
              setSocial(!social);
            }}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {social ? (
          <Fragment>
            <div class="form-group social-input">
              <i class="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={onChangeHandler}
                name="twitter"
              />
            </div>

            <div class="form-group social-input">
              <i class="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebook}
                onChange={onChangeHandler}
                name="facebook"
              />
            </div>

            <div class="form-group social-input">
              <i class="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                onChange={onChangeHandler}
                name="youtube"
              />
            </div>

            <div class="form-group social-input">
              <i class="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                onChange={onChangeHandler}
                name="linkedin"
              />
            </div>

            <div class="form-group social-input">
              <i class="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                onChange={onChangeHandler}
                name="instagram"
              />
            </div>
          </Fragment>
        ) : (
          <Fragment />
        )}

        <button type="submit" className="btn btn-primary my-1">
          {userProfile ? 'Update' : 'Create'}
        </button>
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );

  return jsxComponent;
};
const mapStateToProps = (state) => ({
  userProfile: state.profile.profile,
});

const mapDispatchToProps = {
  registerProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Createprofile);
