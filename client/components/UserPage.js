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
  }, [user.id, adminUser]);

  const linkGithub = () => {
    window.location.href = `${window.location.origin}/github/login`;
  };

  const hasGithubId = user => {
    if (user.githubId) {
      return true;
    }
    return false;
  };

  let userToShow;
  if (Object.keys(adminUser).length) {
    userToShow = { ...adminUser };
  } else {
    userToShow = { ...user };
  }
  return (
    <div>
      <p> User ID: {userToShow.id}</p>
      <p> User githubId: {userToShow.githubId}</p>
      <div>
        {hasGithubId(userToShow) ? (
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
        firstName={userToShow.firstName}
      />
    </div>
  );
};

const mapStateToProps = ({ user, adminUser, userChallenges, individualChallenge }) => {
  return {
    user,
    adminUser,
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
