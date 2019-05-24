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
