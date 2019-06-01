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

export const getUser = aUser => dispatch => {
  console.log('loggingin store', aUser);
  return axios.put('/api/users/auth/login', aUser).then(user => dispatch(setUser(user)));
};

export const getGithubUser = () => dispatch => {
  return axios.get('/api/users/auth/login/github_user')
  .then(res => res.data)
  .then(user => dispatch(setUser(user)))
}