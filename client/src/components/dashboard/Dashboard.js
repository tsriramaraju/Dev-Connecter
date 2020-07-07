import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import Education from './Education/Education';
import Experience from './Experience/Experience';
import Spinners from '../UI elements/Spinners';
import { Link } from 'react-router-dom';

const Dashboard = ({ getProfile, user, isLoading, profile, userloading }) => {
  useEffect(() => {
    getProfile();
  }, []);

  let jsxItems = <Fragment></Fragment>;
  if (userloading || user == null) {
    jsxItems = <Spinners />;
  } else if (!isLoading) {
    jsxItems = (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user.name}
          </p>
          <div className="dash-buttons">
            <Link to="/createprofile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/addexperience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/addeducation" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary"></i> Add
              Education
            </Link>
          </div>

          {profile !== null ? (
            <Fragment>
              <Education />
              <Experience />
            </Fragment>
          ) : (
            <h1>add profile</h1>
          )}
          <div className="my-2">
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </section>
      </Fragment>
    );
  } else jsxItems = <Spinners />;

  return jsxItems;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.profile.loading,
  profile: state.profile.profile,
  userloading: state.auth.loading,
});

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
