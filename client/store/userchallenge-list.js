import axios from 'axios';

// action types
export const SET_USER_CHALLENGES = Symbol('set user challenges');

// action creators
export const setUserChallenges = userChallenges => ({
  type: SET_USER_CHALLENGES,
  userChallenges,
});

// reducer
export const userChallenges = (state = [], action) => {
  switch (action.type) {
    case SET_USER_CHALLENGES:
      return action.userChallenges;
    default:
      return state;
  }
};

// thunks

// Returns all challenges with user submitted solutions
export const fetchUserChallenges = userId => dispatch => {
  return axios
    .get(`api/users/${userId}/userchallenges`)
    .then(res => res.data)
    .then(challenges => dispatch(setUserChallenges(challenges)));
};
