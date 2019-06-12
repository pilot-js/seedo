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

// // Return search challenges with a search term
// export const fetchFilterChallenges = difficulty => dispatch => {
//   return axios
//     .get(`api/challenges/filter/${difficulty}`)
//     .then(res => dispatch(getChallenges(res.data)));
// };

export const fetchChallengesWithFilterAndSearch = (filter, search) => dispatch => {
  console.log('logging in store', typeof filter, search);
  if (!search) {
    console.log(`api/challenges/filter/${filter}`)
    return axios
      .get(`api/challenges/filter/${filter}`)
      .then(res => dispatch(getChallenges(res.data)));
  }
  console.log(`api/challenges/filter/${filter}/search/${search}`)
  return axios
    .get(`api/challenges/filter/${filter}/search/${search}`)
    .then(res => dispatch(getChallenges(res.data)));
};
