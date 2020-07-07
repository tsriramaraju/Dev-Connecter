import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  GET_INDIVIDUAL_PROFILE,
  ADD_PROFILE,
  ADD_EDUCATION,
  ADD_EXPRERIENCE,
  GET_REPOS,
  DELETE_EDUCATION,
  DELETE_EXPRERIENCE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case GET_INDIVIDUAL_PROFILE:
    case ADD_PROFILE:
    case ADD_EXPRERIENCE:
    case ADD_EDUCATION:
    case DELETE_EDUCATION:
    case DELETE_EXPRERIENCE:
      return { ...state, profile: payload, loading: false };

    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };

    case GET_REPOS:
      return { ...state, repos: payload, loading: false };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,

        repos: [],

        error: {},
      };

    default:
      return state;
  }
}
