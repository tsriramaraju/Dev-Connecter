import {
  ADD_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_INDIVIDUAL_PROFILE,
  CLEAR_PROFILE,
  GET_REPOS,
  ADD_EDUCATION,
  ADD_EXPRERIENCE,
  DELETE_EXPRERIENCE,
  DELETE_EDUCATION,
} from './types';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthHeader';
import { setAlert } from './alert';
const uri = 'http://localhost:8080/v1/api/';

//Get personal profile from token
export const getProfile = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${uri}profile/me`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
  }
};

//Get Developer's profiles

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(`${uri}profile/`);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
  }
};

// Get Developer profile by id
export const getIndividualProfile = (id) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${uri}profile/user/${id}`);

    dispatch({
      type: GET_INDIVIDUAL_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
  }
};

//Get Developer's profiles

export const getRepos = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${uri}profile/github/${id}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
  }
};

//Create Profile

export const registerProfile = (formData) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`${uri}profile/`, body, config);

    dispatch({
      type: ADD_PROFILE,
      payload: res.data.result,
    });
    dispatch(setAlert('Sucessfully created', 'sucess'));
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
  }
};

//add EDUCATION

export const addEducation = (formData) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.put(`${uri}profile/education/`, body, config);

    dispatch({
      type: ADD_EDUCATION,
      payload: res.data,
    });
    dispatch(setAlert('Sucessfully added', 'sucess'));
  } catch (err) {
    if (err.response) {
      console.log(`%c response error`, 'color:red');
      // console.log(err.response);
      const errArray = err.response.data;
      errArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    } else if (err.request) {
      console.log(`request error ${err.response.data}`);
    } else {
      console.log(`total error ${err.response.data}`);
    }
  }
};

//add EXPEREINCE

export const addExperience = (formData) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.put(`${uri}profile/experience/`, body, config);

    dispatch({
      type: ADD_EXPRERIENCE,
      payload: res.data,
    });
    dispatch(setAlert('Sucessfully added', 'sucess'));
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
  }
};

//Delete EXPEREINCE

export const deleteExperience = (id) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(`${uri}profile/experience/${id}`);

    dispatch({
      type: DELETE_EXPRERIENCE,
      payload: res.data,
    });
    dispatch(setAlert('Sucessfully added', 'sucess'));
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
  }
};

//Delete EEDUCATION

export const deleteEducation = (id) => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(`${uri}profile/education/${id}`);

    dispatch({
      type: DELETE_EDUCATION,
      payload: res.data,
    });
    dispatch(setAlert('Sucessfully added', 'sucess'));
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
  }
};
