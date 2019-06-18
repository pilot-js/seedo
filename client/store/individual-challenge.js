import axios from 'axios';

export const GET_CHALLENGE = Symbol('get challenge');

export const getChallenge = challenge => ({ type: GET_CHALLENGE, challenge });

export const individualChallenge = (state = {}, action) => {
  switch (action.type) {
    case GET_CHALLENGE:
      return action.challenge;
    default:
      return state;
  }
};

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
    return axios
      .post('/api/comments', comment)
      .then(res => res.data)
      .then(comment => {
        return axios
          .get(`api/challenges/${challengeId}`)
          .then(res => res.data)
          .then(challenge => dispatch(getChallenge(challenge)));
      });
  };
};
