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

export const updateUserchallenge = (
  userAnswer,
  userchallengeId,
  createDiff,
  isSubmit,
) => dispatch => {
  userAnswer.submitted = isSubmit;
  return axios
    .put(`/api/userchallenges/${userchallengeId}`, { userAnswer, createDiff, isSubmit })
    .then(res => res.data)
    .then(userchallenge => dispatch(setUserchallenge(userchallenge)));
};

export const fetchUserchallengeById = id => dispatch => {
  return axios
    .get(`/api/userchallenges/${id}`)
    .then(res => res.data)
    .then(userchallenge => dispatch(setUserchallenge(userchallenge)));
};

export const fetchUserchallenge = (userId, challengeId) => dispatch => {
  return axios
    .get(`/api/userchallenges/users/${userId}/challenges/${challengeId}`)
    .then(res => res.data)
    .then(userchallenge => {
      console.log('store: ', userchallenge);
      return dispatch(setUserchallenge(userchallenge));
    });
};
