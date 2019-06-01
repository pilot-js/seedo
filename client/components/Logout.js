import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store';

const _Logout = props => {
  const logout = () => {
    props.logoutUser().then(() => props.history.push('/'));
  };

  return (
    <div>
      <p>Do you want to log out?</p>
      <button type="button" onClick={logout}>Yes!</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export const Logout = connect(
  null,
  mapDispatchToProps,
)(_Logout);
