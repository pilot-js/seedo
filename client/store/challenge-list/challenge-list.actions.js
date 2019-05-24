export const GET_CHALLENGES = Symbol('get challenges');

export const getChallenges = challenges => ({ type: GET_CHALLENGES, challenges });
