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
      .then(res => {
        console.log('res.data: ', res.data);
        return res.data;
      })
      .then(challenge => {
        console.log('challenge in store: ', challenge)
        return dispatch(getChallenge(challenge))
      });
  };
};
