import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserChallenges } from '../store';

const _UserPage = ({ user, userChallenges, individualChallenge, fetchUserChallenges }) => {
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
      <div className="d-flex flex-column align-items-center">
        <h1>My Completed Challenges</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Challenge Name</th>
              <th>UserChallenge</th>
            </tr>
          </thead>
          <tbody>
            {userChallenges.map(uc => {
              return (
                <tr key={uc.id}>
                  <td>{uc.name}</td>
                  <td>
                    <Link to={`/solutions/${uc.id}/challenges/${individualChallenge.id}`}>
                      <span>{uc.name}</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
});

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UserPage);
