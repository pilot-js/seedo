import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, getGithubUser } from '../store';

const LoginClass = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveHandler = ev => {
    ev.preventDefault();
    props.getUser({ email, password }).then(() => props.history.push('/'));
  };

  const githubOauth = () => {
    // TODO: Figure out a better way to to do this, as it doesn't work on heroku.
    // history.push?
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
      <button type="button" onClick={githubOauth}>
        Login With Github
      </button>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
  getGithubUser: () => dispatch(getGithubUser()),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginClass);
