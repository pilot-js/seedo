import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { putUserchallenge } from '../store/userchallenge';

const _IndividualChallenge = props => {
  useEffect(() => {
    // TODO: pull in related challenge information from prop
    // fetchChallenge(props.challengeId);
    // TODO: pull active userchallenge if no id specified
    // if (props.userchallengeId) {
    //   fetchUserchallenge(props.userchallenge.Id);
    // } else {
    //   fetchActiveUserchallenge(props.challengeId, props.userId);
    // };
  }, []);
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');

  const changeValue = () => {
    // TODO: axios post call to the backend
    console.log({ html, css, js });
  };

  const putValue = isSubmit => {
    const userAnswer = { html, css, js, submitted: true, challengeId: props.id };
    props
      .putUserchallenge(userAnswer, props.id, isSubmit)
      .then(userchallenge => console.log(userchallenge))
      .catch(ex => console.log(ex));
  };

  const challenge = { name: 'challenge1', description: 'draw a circle', difficulty: 1 };
  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <div>
        <div className="row">
          <div className="col">users page goes here</div>
          <div className="col">our image goes here</div>
        </div>
        <div className="row">
          <div className="col">
            <h2>HTML Editor</h2>
            <CodeMirror
              value={html}
              onChange={(value, eventData) => setHTML(value)}
              options={options}
            />
            <button name="codeHTML" type="button" onClick={changeValue}>
              save
            </button>
          </div>
          <div className="col">
            <h2>CSS Editor</h2>
            <CodeMirror
              value={css}
              onChange={(value, eventData) => setCSS(value)}
              options={options}
            />
            <button name="codeCSS" type="button" onClick={changeValue}>
              save
            </button>
          </div>
          <div className="col">
            <h2>JS Editor</h2>
            <CodeMirror
              value={js}
              onChange={(value, eventData) => setJS(value)}
              options={options}
            />
            <button name="codeJS" type="button" onClick={changeValue}>
              save
            </button>
          </div>
        </div>
        <button type="button" onClick={() => putValue(false)}>
          Run
        </button>
        <button type="button" onClick={() => putValue(true)}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  putUserchallenge: (userAnswer, userchallengeId, isSubmit) =>
    dispatch(putUserchallenge(userAnswer, userchallengeId, isSubmit)),
});

export const IndividualChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_IndividualChallenge);
