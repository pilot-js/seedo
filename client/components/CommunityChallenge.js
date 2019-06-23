import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';

import { fetchOneChallenge, fetchUsers } from '../store';
import { Review } from './Review';

// CodeMirror formating & highlighting
require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/markdown/markdown');

const _CommunityChallenge = props => {
  const { individualChallenge, challengeId, user, fetchOneChallenge, users, fetchUsers } = props;
  useEffect(() => {
    fetchOneChallenge(challengeId);
    fetchUsers();
  }, []);

  const optionsHTML = {
    lineNumbers: true,
    mode: 'xml',
    theme: 'monokai',
    readOnly: true,
  };
  const optionsCSS = {
    lineNumbers: true,
    mode: 'css',
    theme: 'monokai',
    readOnly: true,
  };

  console.log('userId: ', user);

  return (
    <div id="community-challenge">
      <h1>{individualChallenge.name}</h1>
      {Object.keys(individualChallenge).length ? (
        <div>
          <h2>All user submitted answers: </h2>
          <div className="container">
            <ul>
              {individualChallenge.userchallenges.map(userchal => {
                const user = users.find(user => user.id === userchal.userId) || { email: '' };
                // TODO should not display if html and css are both empty
                // {
                //   userchal.html & userchal.css
                //     ? (
                return (
                  <div key={userchal.id}>
                    <p className="mb-0 mt-4 mb-4">
                      Submitted by: <b className="mr-0">{user.email}</b>
                    </p>
                    <div className="row">
                      <div className="col-sm-6 code-display">
                        <h3 className="text-primary text-center">HTML</h3>
                        <CodeMirror defaultValue={userchal.html} options={optionsHTML} />
                      </div>
                      <div className="col-sm-6 code-display">
                        <h3 className="text-primary text-center">CSS</h3>
                        <CodeMirror defaultValue={userchal.css} options={optionsCSS} />
                      </div>
                    </div>
                    <hr />
                  </div>
                  // ) : (
                  //   ''
                  // )
                  // }
                );
              })}
            </ul>
          </div>
          <h2>All user comments</h2>
          <ul className="list-group">
            {individualChallenge.comments.map(comment => {
              const user = users.find(user => user.id === comment.userId) || { email: '' };
              return (
                <li className="list-group-item" key={comment.id}>
                  <strong className="mr-0">{user.email}</strong>: {comment.text}
                </li>
              );
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
