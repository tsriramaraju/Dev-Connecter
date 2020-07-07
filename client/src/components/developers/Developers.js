import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../redux/actions/profile';
import Developerprofile from './DeveloperProfile';
import Spinner from '../UI elements/Spinners';

const Developers = ({ getProfiles, loading }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  let jsxComponent;
  if (loading) jsxComponent = <Spinner />;
  else
    jsxComponent = (
      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        <Developerprofile />
      </section>
    );

  return jsxComponent;
};

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
