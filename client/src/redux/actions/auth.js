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

// Load User - load user details
export const loadUser = () => async (dispatch) => {};

// Register User - Register user and load details
export const register = (formData) => async (dispatch) => {};

// Login User - login and load details
export const login = (email, password) => async (dispatch) => {};

// Logout
export const logout = () => ({ type: LOGOUT });
