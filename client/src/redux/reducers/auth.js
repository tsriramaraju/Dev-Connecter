import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function alert(state = initialState, action) {
  const { type, payload } = action;

  //   switch (type) {
  //     case SET_ALERT:
  //       return [...state, payload];

  //     case REMOVE_ALERT:
  //       return state.filter((error) => error.id !== payload);

  //     default:
  //       return state;
  //   }
}
