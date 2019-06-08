import axios from 'axios';

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

export const getGithubUser = () => dispatch => {
  return axios
    .get('/auth/login/github_user')
    .then(res => res.data)
    .then(user => dispatch(setUser(user)));
};

export const getUser = user => dispatch => {
  return axios.put('/auth/login', user).then(res => {
    dispatch(setUser(res.data));
  });
};

export const logoutUser = () => dispatch => {
  return axios.delete('/auth/logout').then(() => dispatch(setUser({})));
};

export const createUser = user => dispatch => {
  return axios.post('/api/users', user).then(res => dispatch(setUser(res.data)));
};
