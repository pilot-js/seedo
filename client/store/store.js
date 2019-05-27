import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { individualChallenge } from './individual-challenge';
import { challenges } from './challenge-list';
import { user } from './user';

export const store = createStore(
  combineReducers({ individualChallenge, challenges, user }),
  applyMiddleware(thunkMiddleware),
);
