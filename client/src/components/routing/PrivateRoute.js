import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';

const Privateroute = ({ setAlert, isAuth, component, children, ...rest }) => {
  if (!isAuth) {
    setAlert('Not Authorized', 'danger', 2000);
    return <Redirect to="/login" />;
  }

  return <Route component={component}>{children}</Route>;
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Privateroute);
