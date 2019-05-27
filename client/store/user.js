import Axios from "axios";

export const SET_USER = Symbol('set user');

export const setUser = user => ({ type: SET_USER, user });

export const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export const getUser = userId => dispatch => {
  return Axios.get(`/api/users/${userId}`)
    .then(user => dispatch(setUser(user)));
};

