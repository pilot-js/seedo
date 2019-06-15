import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchOneChallenge } from '../store';

const _CommunityChallenge = ({ challenge, challengeId, fetchOneChallenge }) => {
  useEffect(() => {
    fetchOneChallenge(challengeId);
  }, []);
  return (
    <div>
      <h1>{challenge.name}</h1>
      {Object.keys(challenge).length ? (
        <div>
          <h4>all user submitted answers: </h4>
          <ul>
            {challenge.userchallenges.map(userchal => {
              return <li key={userchal.id}>{userchal.html}</li>;
            })}
          </ul>
          <h4>all user comments</h4>
          <ul>
            {challenge.comments.map(comment => {
              return <li key={comment.id}>comment</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    challenge: state.individualChallenge,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  };
};

export const CommunityChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CommunityChallenge);
