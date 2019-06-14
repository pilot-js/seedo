import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
      <div className="d-flex justify-content-center">
        <h1>Solution and Comments</h1>
      </div>
      <div className="d-flex justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th>Challenges</th>
              <th>Solutions</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map(chal => {
              return (
                <tr key={chal.id}>
                  <td>{chal.name}</td>
                  <td>solutions</td>
                  <td>comments</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Community = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_communitySolutionComments);
