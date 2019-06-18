import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUserChallenges, fetchOneChallenge, fetchAdminUser } from '../store';

import { UserCompletedChallenges } from './UserCompletedChallenges';

const _UserPage = ({
  user,
  adminUserId,
  adminUser,
  userChallenges,
  challengeId,
  individualChallenge,
  fetchUserChallenges,
  fetchAdminUser,
}) => {
  const isAdminUser = adminUserId ? true : false;

  useEffect(() => {
    let userId = user.id;
    if (isAdminUser) {
      userId = adminUserId;
      fetchAdminUser(userId).catch(err => console.log('err fetching adminUser:', err));
    }

    if (userId) {
      fetchUserChallenges(userId).catch(e =>
        console.error(`Failed to get userChallenges. Here's why:\n${e}`),
      );
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
        isAdminUser={isAdminUser}
        firstName={user.firstName}
      />
    </div>
  );
};

const mapStateToProps = ({ user, adminUser, userChallenges, individualChallenge }) => {
  if (user.type === 'admin') {
    user = adminUser;
  }
  return {
    user,
    individualChallenge,
    userChallenges,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserChallenges: userId => dispatch(fetchUserChallenges(userId)),
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchAdminUser: userId => dispatch(fetchAdminUser(userId)),
});

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UserPage);
