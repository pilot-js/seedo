import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = document.querySelector('#root');

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  root,
);
