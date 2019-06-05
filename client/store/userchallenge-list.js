import axios from 'axios';

export const SET_USER_CHALLENGES = Symbol('set user challenges');

export const setUserChallenges = userChallenges => ({
  type: SET_USER_CHALLENGES,
  userChallenges,
});

export const userChallenges = (state = [], action) => {
  switch (action.type) {
    case SET_USER_CHALLENGES:
      return action.userChallenges;
    default:
      return state;
  }
};

// Returns all challenges with user submitted solutions
export const fetchUserChallenges = userId => dispatch => {
  return axios
    .get(`api/users/${userId}/userchallenges`)
    .then(res => res.data)
    .then(challenges => dispatch(setUserChallenges(challenges)));
};
