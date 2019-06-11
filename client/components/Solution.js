import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { fetchOneChallenge, fetchUserchallengeById } from '../store';
import { convertBufferToImgSrc } from '../utils';

// two props passed down from route parameters
// challengeId and userchallengeId
const _Solution = ({
  user,
  individualChallenge,
  userchallenge,
  challengeId,
  userchallengeId,
  fetchOneChallenge,
  fetchUserchallengeById,
}) => {
  useEffect(() => {
    if (challengeId) {
      fetchOneChallenge(challengeId);
    }
    if (userchallengeId) {
      fetchUserchallengeById(userchallengeId);
    }
  }, []);

  console.log(individualChallenge);
  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };
  return (
    <div>
      <h2>Our solution</h2>
      <div className="d-flex justify-content-around row">
        <div className="col">
          {individualChallenge ? (
            <CodeMirror defaultValue={individualChallenge.solutions[0].html} options={options} />
          ) : null}
        </div>
        <div className="col">
          {individualChallenge ? (
            <CodeMirror defaultValue={individualChallenge.solutions[0].css} options={options} />
          ) : null}
        </div>
      </div>
      <h2>Your solution</h2>
      <div className="d-flex justify-content-around row">
        <div className="col">
          <CodeMirror defaultValue={userchallenge.html} options={options} />
        </div>
        <div className="col">
          <CodeMirror defaultValue={userchallenge.css} options={options} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, individualChallenge, userchallenge }) => ({
  user,
  individualChallenge,
  userchallenge,
});

const mapDispatchToProps = dispatch => ({
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchUserchallengeById: (userId, challengeId) =>
    dispatch(fetchUserchallengeById(userId, challengeId)),
});

export const Solution = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Solution);
