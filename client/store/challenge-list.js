export const GET_CHALLENGES = Symbol('get challenges');

export const getChallenges = challenges => ({ type: GET_CHALLENGES, challenges });

export const challenges = (state = [], action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return action.challenges;
    default:
      return state;
  }
};
