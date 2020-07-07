import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';
import { Redirect } from 'react-router-dom';

const Registration = ({ register, setAlert, isAuth }) => {
  const [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  if (isAuth) return <Redirect to="/dashboard" />;

  const { name, email, password, password2 } = formData;

  const onChangeHandler = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (password2 !== password) {
      console.log('password dont match');
      setAlert('Passwords Dont Match', 'danger');
      return;
    }
    register(formData);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={onChangeHandler}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChangeHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  register,
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
