import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import axios from 'axios';

import setAuth from '../../utils/setAuthHeader';
import setAuthToken from '../../utils/setAuthHeader';

const uri = 'http://localhost:8080/v1/api/';

// Load User - load user details
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${uri}auth/`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      console.log(`%c response error`, 'color:red');
      const errArray = err.response.data;
      errArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    } else if (err.request) {
      console.log(`request error ${err.response.data}`);
    } else {
      console.log(`total error ${err.response.data}`);
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User - Register user and load details
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`${uri}users/`, body, config);
    dispatch(setAlert('User Registered', 'success'));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      console.log(`%c response error`, 'color:red');
      const errArray = err.response.data;
      errArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    } else if (err.request) {
      console.log(`request error ${err.response.data}`);
    } else {
      console.log(`total error ${err.response.data}`);
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User - login and load details
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`${uri}auth/`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      console.log(`%c response error`, 'color:red');
      const errArray = err.response.data;
      errArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    } else if (err.request) {
      console.log(`request error ${err.response.data}`);
    } else {
      console.log(`total error ${err.response.data}`);
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
