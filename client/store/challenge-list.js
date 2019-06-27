import axios from 'axios';

// action types
export const GET_CHALLENGES = Symbol('get challenges');

// action creators
export const getChallenges = challenges => ({ type: GET_CHALLENGES, challenges });

// reducer
export const challenges = (state = [], action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return action.challenges;
    default:
      return state;
  }
};

// thunks
export const fetchChallenges = () => {
  return dispatch => {
    return axios
      .get('api/challenges')
      .then(res => res.data)
      .then(challenges => dispatch(getChallenges(challenges)));
  };
};

export const fetchChallengesWithFilterAndSearch = (filter, search) => dispatch => {
  if (!search) {
    return axios
      .get(`api/challenges/filter/${filter}`)
      .then(res => dispatch(getChallenges(res.data)));
  }
  return axios
    .get(`api/challenges/search/${search}/filter/${filter}`)
    .then(res => dispatch(getChallenges(res.data)));
};
