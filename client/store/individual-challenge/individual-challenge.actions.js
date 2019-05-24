export const GET_CHALLENGE = Symbol('get challenge');

export const getChallenge = challenge => ({ type: GET_CHALLENGE, challenge });
