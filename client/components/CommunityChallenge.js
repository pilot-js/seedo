import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchOneChallenge } from '../store';

const _CommunityChallenge = ({ individualChallenge, challengeId, fetchOneChallenge }) => {
  useEffect(() => {
    fetchOneChallenge(challengeId);
  }, []);
  console.log(individualChallenge);
  return (
    <div>
      <h1>{individualChallenge.name}</h1>
      {Object.keys(individualChallenge).length ? (
        <div>
          <h2>all user submitted answers: </h2>
          <ul>
            <div className="container">
              {individualChallenge.userchallenges.map(userchal => {
                return (
                  <li key={userchal.id}>
                    <div className="row">
                      <div className="col-sm">
                        <pre className="line-numbers">
                          <code className="language-html">{userchal.html}</code>
                        </pre>
                      </div>
                      <div className="col-sm">
                        <pre className="line-numbers">
                          <code className="language-css">{userchal.css}</code>
                        </pre>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ul>
          <h2>all user comments</h2>
          <ul>
            {individualChallenge.comments.map(comment => {
              return <li key={comment.id}>{comment.text}</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ individualChallenge }) => ({
  individualChallenge,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  };
};

export const CommunityChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CommunityChallenge);
