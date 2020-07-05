import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../redux/actions/alert';

const Registration = ({ setAlert }) => {
  const [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

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

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      const uri = 'http://localhost:8080/v1/api/users/';
      const res = await axios.post(uri, body, config);
      setAlert(res.data.msg, 'success');
    } catch (err) {
      if (err.response) {
        console.log(`%c response error`, 'color:red');
        const errArray = err.response.data;
        errArray.forEach((err) => setAlert(err.msg, 'danger'));
      } else if (err.request) {
        console.log(`request error ${err.response.data}`);
      } else {
        console.log(`total error ${err.response.data}`);
      }
    }
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

export default connect(null, { setAlert })(Registration);
