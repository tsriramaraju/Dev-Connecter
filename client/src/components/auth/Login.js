import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';
const Login = ({ setAlert }) => {
  const [formData, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      const uri = 'http://localhost:8080/v1/api/auth/';
      const res = await axios.post(uri, body, config);
      console.log(res.data);
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
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </section>
  );
};

export default connect(null, { setAlert })(Login);
