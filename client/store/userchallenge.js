import axios from 'axios';

export const SET_USER_CHALLENGE = Symbol('set user challenge');

export const setUserchallenge = userchallenge => ({ type: SET_USER_CHALLENGE, userchallenge });

export const userchallenge = (state = [], action) => {
  switch (action.type) {
    case SET_USER_CHALLENGE:
      return action.userchallenge;
    default:
      return state;
  }
};

export const putUserchallenge = (userAnswer, userchallengeId) => dispatch => {
  console.log('userAnswer in store', userAnswer);
  return axios
    .put(`/api/userchallenges/${userchallengeId}`, userAnswer)
    .then(res => res.data)
    .then(userAnswer => dispatch(setUserchallenge(userAnswer)));
};
