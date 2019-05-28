import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { individualChallenge } from './individual-challenge';
import { challenges } from './challenge-list';
import { user } from './user';
import { userchallenge } from './userchallenge';

export const store = createStore(
  combineReducers({ individualChallenge, challenges, user, userchallenge }),
  applyMiddleware(thunkMiddleware),
);
