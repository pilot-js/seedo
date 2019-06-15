import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUserChallenges, fetchOneChallenge } from '../store';

import { UserCompletedChallenges } from './UserCompletedChallenges';

const _UserPage = ({
  user,
  userChallenges,
  challengeId,
  individualChallenge,
  fetchUserChallenges,
}) => {
  useEffect(() => {
    if (user.id) {
      fetchUserChallenges(user.id)
        .then(() => {
          console.log('Got userChallenges!');
        })
        .catch(e => console.error(`Failed to get userChallenges. Here's why:\n${e}`));
    }
    fetchOneChallenge(challengeId);
  }, [user.id]);

  const linkGithub = () => {
    window.location.href = `${window.location.origin}/github/login`;
  };

  const hasGithubId = user => {
    if (user.githubId) {
      return true;
    }
    return false;
  };

  console.log('individualChallenge: ', individualChallenge);
  console.log('challengeId: ', challengeId);
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
      <UserCompletedChallenges
        userChallenges={userChallenges}
        individualChallenge={individualChallenge}
      />
    </div>
  );
};

const mapStateToProps = ({ user, userChallenges, individualChallenge }) => ({
  user,
  individualChallenge,
  userChallenges,
});

const mapDispatchToProps = dispatch => ({
  fetchUserChallenges: userId => dispatch(fetchUserChallenges(userId)),
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
});

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UserPage);
