import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserChallenges } from '../store';

const _UserPage = ({ user, userChallenges, fetchUserChallenges }) => {
  useEffect(() => {
    fetchUserChallenges(user.id);
  }, []);

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

const mapStateToProps = ({ user, userChallenges }) => ({
  user,
  userChallenges,
});

const mapDispatchToProps = dispatch => ({
  fetchUserChallenges: userId => dispatch(fetchUserChallenges(userId)),
});

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UserPage);
