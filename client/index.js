import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import { store } from './store';
import App from './App';

const root = document.querySelector('#root');

// used to help screen readers
Modal.setAppElement(root);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  root,
);
