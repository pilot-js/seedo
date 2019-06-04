import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { individualChallenge } from './individual-challenge';
import { challenges } from './challenge-list';
import { user } from './user';
import { userchallenge } from './userchallenge';
import { userChallenges } from './userchallenge-list';

export const store = createStore(
  combineReducers({ individualChallenge, challenges, user, userchallenge, userChallenges }),
  applyMiddleware(thunkMiddleware),
);
