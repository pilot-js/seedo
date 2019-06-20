/* eslint indent: 1 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
});

const _Login = ({ history, getUser, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.getElementById('email').focus();
  }, []);

  const saveHandler = ev => {
    ev.preventDefault();
    getUser({ email, password })
      .then(() => {
        history.push('/challenges');
      })
      .catch(() => window.alert('Incorrect username/password.'));
  };

  const githubOauth = () => {
    window.location.href = `${window.location.origin}/github/login`;
  };

  const userSignUp = () => {
    history.push('./signup');
  };

  return (
    <div id="login" className="d-flex justify-content-center flex-column">
      <p className="text-center">
        In order to take our challenges, you need to be signed in.
        <br />
        If are not yet a member, <strong>Sign Up</strong> below.
        <br />
        If you prefer, you can also sign in using your Github credentials.
      </p>
      <form
        onSubmit={saveHandler}
        className="d-flex justify-content-center flex-column align-items-center login-form"
      >
        <label htmlFor="email" className="login-text">
          Email
        </label>
        <input
          id="email"
          className="form-control login-input"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control login-input"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button type="button" onClick={userSignUp} className="btn btn-success btn-raised">
        Sign Up!
      </button>
      <button type="button" onClick={githubOauth} className="btn btn-info btn-raised">
        Login With Github
      </button>
    </div>
  );
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Login);
