import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { fetchOneChallenge, fetchUserchallenge } from '../store';
import { convertBufferToImgSrc } from '../utils';

// two props passed down from route parameters
// challengeId and userchallengeId
const _Solution = ({ challengeId, userchallengeId, fetchOneChallenge, fetchUserChallenge }) => {
  useEffect(() => {
    if (challengeId) {
      fetchOneChallenge(challengeId);
    }
    if (userchallengeId) {
      fetchUserChallenge(userchallengeId);
    }
  }, []);
};

const mapStateToProps = ({ user, individualChallenge, userchallenge }) => ({
  user,
  individualChallenge,
  userchallenge,
});

const mapDispatchToProps = dispatch => ({
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchUserchallenge: (userId, challengeId) => dispatch(fetchUserchallenge(userId, challengeId)),
});

export const Solution = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Solution);
