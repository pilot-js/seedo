import axios from 'axios';

// action types
export const SET_USER_CHALLENGE = Symbol('set user challenge');

// action creators
export const setUserchallenge = userchallenge => ({ type: SET_USER_CHALLENGE, userchallenge });

// reducer
export const userchallenge = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_CHALLENGE:
      return action.userchallenge;
    default:
      return state;
  }
};

// thunks
export const updateUserchallenge = (
  userAnswer,
  userchallengeId,
  createDiff,
  isSubmit,
) => dispatch => {
  userAnswer.submitted = isSubmit; // eslint-disable-line no-param-reassign
  return axios
    .put(`/api/userchallenges/${userchallengeId}`, { userAnswer, createDiff, isSubmit })
    .then(res => res.data)
    .then(userchallenge => dispatch(setUserchallenge(userchallenge)));
};

export const fetchAllUserchallenges = () => dispatch => {
  return axios
    .get('/api/userchallenges')
    .then(userchallenges => dispatch(setUserchallenge(userchallenges.data)));
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
      return dispatch(setUserchallenge(userchallenge));
    });
};
