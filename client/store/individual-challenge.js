import axios from 'axios';

// action types
export const GET_CHALLENGE = Symbol('get challenge');

// action creators
export const getChallenge = challenge => ({ type: GET_CHALLENGE, challenge });

// reducer
export const individualChallenge = (state = {}, action) => {
  switch (action.type) {
    case GET_CHALLENGE:
      return action.challenge;
    default:
      return state;
  }
};

// thunks
export const fetchOneChallenge = challengeId => {
  return dispatch => {
    return axios
      .get(`api/challenges/${challengeId}`)
      .then(res => res.data)
      .then(challenge => dispatch(getChallenge(challenge)));
  };
};

export const addCommentToOneChallenge = (challengeId, comment) => {
  return dispatch => {
    return axios.post('/api/comments', comment).then(() => {
      return axios
        .get(`api/challenges/${challengeId}`)
        .then(res => res.data)
        .then(challenge => dispatch(getChallenge(challenge)));
    });
  };
};
