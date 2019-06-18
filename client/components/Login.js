import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
});

const _Login = ({ history, getUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.getElementById('email').focus();
  }, []);

  const saveHandler = ev => {
    ev.preventDefault();
    getUser({ email, password })
      .then(() => history.push('/challenges'))
      .catch(error => console.log(error));
  };

  const githubOauth = () => {
    window.location.href = `${window.location.origin}/github/login`;
  };

  const userSignUp = () => {
    history.push('./signup');
  };

  return (
    <div className="justify-align-center">
      <form onSubmit={saveHandler}>
        <label htmlFor="email" className="login-text">
          Email
        </label>
        <input
          id="email"
          className="form-control login-form"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control login-form"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={userSignUp}>
        Sign Up!
      </button>
      <button type="button" onClick={githubOauth}>
        Login With Github
      </button>
    </div>
  );
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Login);
