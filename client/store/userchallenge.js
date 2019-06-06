import axios from 'axios';

export const SET_USER_CHALLENGE = Symbol('set user challenge');

export const setUserchallenge = userchallenge => ({ type: SET_USER_CHALLENGE, userchallenge });

export const userchallenge = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_CHALLENGE:
      return action.userchallenge;
    default:
      return state;
  }
};

export const updateUserchallenge = (userAnswer, userchallengeId, isSubmit) => dispatch => {
  return axios
    .put(`/api/userchallenges/${userchallengeId}`, { userAnswer, isSubmit })
    .then(res => res.data)
    .then(userAnswer => dispatch(setUserchallenge(userAnswer)));
};
