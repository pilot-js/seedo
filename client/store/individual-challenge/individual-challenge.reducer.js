import { GET_CHALLENGE } from './individual-challenge.actions';

export const individualChallenge = (state = {}, action) => {
  switch (action.type) {
    case GET_CHALLENGE:
      return action.challenge;
    default:
      return state;
  }
};
