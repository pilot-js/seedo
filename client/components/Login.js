import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getUser, getGithubUser, createUser } from '../store';

const LoginClass = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveHandler = ev => {
    ev.preventDefault();
    props
      .getUser({ email, password })
      .then(() => props.history.push('/challenges'))
      .catch(error => console.log(error));
  };

  const githubOauth = () => {
    window.location.href = `${window.location.origin}/github/login`;
  };

  const userSignUp = ev => {
    ev.preventDefault();
    props
      .createUser({ email, password })
      .then(() => props.history.push('/challenges'))
      .catch(error => console.log(error));
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
      <button type="button" onClick={userSignUp}>
        Sign Up!
      </button>
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
  createUser: user => dispatch(createUser(user)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginClass);
