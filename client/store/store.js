import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { individualChallenge } from './individual-challenge';
import { challenges } from './challenge-list';

export const store = createStore(
  combineReducers({ individualChallenge, challenges }),
  applyMiddleware(thunkMiddleware),
);
