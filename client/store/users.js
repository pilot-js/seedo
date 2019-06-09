import axios from 'axios';

// action types
const SET_USERS = Symbol('set users');

// action creators
const setUsers = users => ({
  type: SET_USERS,
  SET_USERS,
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
export const fetchUsers = () => {};
