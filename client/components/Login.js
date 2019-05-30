import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';

const LoginClass = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CLIENT_ID, setClientId] = useState('712a1372abccbaf43bfc');
  const [CLIENT_SECRET, setSecret] = useState('1b9a5bbf6e46b74a52faf3c108f7acee671c82ae');

  const saveHandler = ev => {
    ev.preventDefault();
    props
      .getUser({ email, password })
      .then(() => console.log('We have a user logged in.'))
      .then(() => props.history.push('/'));
  };

  const GithubOauth = () => {
    window.location.href=`https://github.com/login/oauth/authorize?client_id${CLIENT_ID}`
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
      <button onClick={GithubOauth}> Login With Github </button>
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
