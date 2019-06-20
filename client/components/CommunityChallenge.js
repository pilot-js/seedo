import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchOneChallenge, fetchUsers } from '../store';
import { Review } from './Review';

const _CommunityChallenge = props => {
  const { individualChallenge, challengeId, user, fetchOneChallenge, users, fetchUsers } = props;
  useEffect(() => {
    fetchOneChallenge(challengeId);
    fetchUsers();
  }, []);
  return (
    <div id="community-challenge">
      <h1>{individualChallenge.name}</h1>
      {Object.keys(individualChallenge).length ? (
        <div>
          <h2>All user submitted answers: </h2>
          <div className="container">
            <ul>
              {individualChallenge.userchallenges.map(userchal => {
                console.log('userchal: ', userchal)
                console.log('users: ', users)

                const user = users.find(user=>user.id === userchal.userId) || { email: '' };
                
                return (
                  <div key={userchal.id}>
                    <p className="mb-0 mt-2">Submitted by:{' '}<b className="mr-0">{user.email}</b></p>
                    <div className="row">
                      <div className="col-sm-6 code-display border">
                        <h3 className="text-primary text-center">HTML</h3>
                        <pre className="line-numbers">
                          <code className="language-html">{userchal.html}</code>
                        </pre>
                      </div>
                      <div className="col-sm-6 code-display border">
                        <h3 className="text-primary text-center">CSS</h3>
                        <pre className="line-numbers">
                          <code className="language-css">{userchal.css}</code>
                        </pre>
                      </div>
                      <hr />
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <h2>All user comments</h2>
          <ul className="list-group">
            {individualChallenge.comments.map(comment => {
                const user = users.find(user=>user.id === comment.userId) || { email: '' };
                return <li className="list-group-item" key={comment.id}><strong className="mr-0">{user.email}</strong>: {comment.text}</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      <Review userId={user.id} challengeId={challengeId} />
    </div>
  );
};

const mapStateToProps = ({ individualChallenge, user, users }) => ({
  individualChallenge,
  user,
  users,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export const CommunityChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CommunityChallenge);
