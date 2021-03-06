import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store';

const _Logout = props => {
  const logout = () => {
    props
      .logoutUser()
      .then(() => props.history.push('/'))
      .catch(error => console.log(error)); // eslint-disable-line no-console
  };

  const cancel = () => {
    props.history.push('/challenges');
  };

  return (
    <div className="text-center">
      <p>Do you want to log out?</p>
      <button type="button" className="btn btn-raised btn-primary mr-2" onClick={logout}>
        Yes!
      </button>
      <button type="button" className="btn btn-raised btn-secondary" onClick={cancel}>
        No, I&apos;m having too much fun!
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export const Logout = connect(
  null,
  mapDispatchToProps,
)(_Logout);
