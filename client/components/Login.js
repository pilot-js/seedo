import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';

const LoginClass = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveHandler = ev => {
    ev.preventDefault();
    props
      .getUser({ email, password })
      .then(() => console.log('We have a user logged in.'))
      .then(() => props.history.push('/'));
  };

  const GithubOauth = () => {
    window.location.href = 'http://localhost:3000/github/login';
  };

  return (
    <div>
      <form onSubmit={saveHandler}>
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={GithubOauth}> Login With Github </button>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: aUser => dispatch(getUser(aUser)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginClass);
