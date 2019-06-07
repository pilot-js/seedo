import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserChallenges } from '../store';

const _UserPage = ({ user, userChallenges, fetchUserChallenges }) => {
  useEffect(() => {
    if (user.id) {
      fetchUserChallenges(user.id)
        .then(() => {
          console.log('Got userChallenges!');
        })
        .catch(e => console.error(`Failed to get userChallenges. Here's why:\n${e}`));
    }
  }, []);

  const linkGithub = () => {
    window.location.href = 'http://localhost:3000/github/login';
  };

  const hasGithubId = user => {
    if (user.githubId) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <p> User ID: {user.id}</p>
      <p> User githubId: {user.githubId}</p>
      <div>
        {hasGithubId(user) ? (
          <p>Already linked to github</p>
        ) : (
          <button type="button" onClick={linkGithub}>
            Link my github
          </button>
        )}
      </div>
      <ul>
        {userChallenges.map(uc => (
          <li>{uc.name}</li>
        ))}
      </ul>
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
