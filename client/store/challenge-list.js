import axios from 'axios';

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

export const fetchChallenges = () => {
  return dispatch => {
    return axios
      .get('api/challenges')
      .then(res => res.data)
      .then(challenges => dispatch(getChallenges(challenges)));
  };
};
