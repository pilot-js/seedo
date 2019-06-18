import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChallenges } from '../store';

// should we creat two thunks for fetching solutions and comments by challengeId
const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
});

const mapStateToProps = ({ user, challenges, individualChallenge }) => ({
  user,
  challenges,
  individualChallenge,
});

const _communitySolutionComments = ({ challenges, fetchChallenges }) => {
  useEffect(() => {
    fetchChallenges();
  }, []);
  return (
    <div>
      <h1 className="text-center">Solution and Comments</h1>
      {
        <ul>
          {challenges.map(chal => {
            return (
              <li key={chal.id}>
                <Link to={`/community/challenge/${chal.id}`}>{chal.name}</Link>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export const Community = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_communitySolutionComments);
