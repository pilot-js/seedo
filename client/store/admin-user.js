// admin: edit users

import axios from 'axios';

// action types
const SET_UPDATE_USER = Symbol('set update user');

// action creators
const setUpdateUser = user => ({ type: SET_UPDATE_USER, user });

// reducer
export const adminUser = (state = [], action) => {
  switch (action.type) {
    case SET_UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};

// thunks
export const fetchAdminUser = userId => {
  return dispatch => {
    return axios.get(`/api/users/${userId}`).then(resp => {
      dispatch(setUpdateUser(resp.data));
    });
  };
};
