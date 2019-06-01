import React from 'react';
import { connect } from 'react-redux';

const _UserPage = props => {
  const { user } = props;
  const linkGithub = () => {
    window.location.href = 'http://localhost:3000/github/login';
  };

  return (
    <div>
      <p> User ID: {user.id}</p>
      <button type="button" onClick={linkGithub}>
        Link my github
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export const UserPage = connect(mapStateToProps)(_UserPage);
