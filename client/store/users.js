import axios from 'axios';

// action types
const SET_USERS = Symbol('set users');

// action creators
const setUsers = users => ({
  type: SET_USERS,
  users,
});

// reducer
export const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};

// thunks
export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(resp => dispatch(setUsers(resp.data)))
      .catch(err => {
        throw new Error(err);
      });
  };
};
