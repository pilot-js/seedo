import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store';

const mapDispatchToState = dispatch => ({
  createUser: user => dispatch(createUser(user)),
});

const _Signup = ({ createUser, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const type = 'user';

  useEffect(() => {
    document.getElementById('firstName').focus();
  }, []);

  const signup = ev => {
    ev.preventDefault();
    createUser({ firstName, lastName, email, password, type })
      .then(() => window.alert('You have successfully sign up, check out some challenges now.'))
      .then(() => history.push('/challenges'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={signup}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          className="form-control"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up!</button>
      </form>
    </div>
  );
};

export const Signup = connect(
  null,
  mapDispatchToState,
)(_Signup);
