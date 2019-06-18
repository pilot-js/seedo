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
    <div>
      <h1>Login</h1>
      <div className="row justify-content-center">
        <form id="login-form" className="form-inline" onSubmit={saveHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-raised btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-raised btn-secondary mr-2" onClick={userSignUp}>
          Sign Up!
        </button>
        <button type="button" className="btn btn-raised btn-primary" onClick={githubOauth}>
          Login With Github
        </button>
      </div>
    </div>
  );
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Login);
