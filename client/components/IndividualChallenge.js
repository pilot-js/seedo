import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { updateUserchallenge, fetchOneChallenge } from '../store';

const _IndividualChallenge = props => {
  useEffect(() => {
    props.fetchOneChallenge(Number(props.id));
  }, []);

  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');

  const changeValue = () => {
    // TODO: axios post call to the backend
    console.log({ html, css, js });
  };

  const updateValue = isSubmit => {
    const userAnswer = { html, css, js, submitted: true, challengeId: props.id };
    props
      .updateUserchallenge(userAnswer, props.id, isSubmit)
      .then(userchallenge => console.log(userchallenge))
      .catch(ex => console.log(ex));
  };

  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };

  if (Object.keys(props.challenge).length === 0) {
    return null;
  }
  const challenge = props.challenge;

  const base64String = btoa(String.fromCharCode(...new Uint8Array(challenge.images[0].data.data)));
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <div>
        <div className="row">
          <div className="col">users page goes here</div>
          <div className="col">
            our image goes here:
            <img src={`data:image/png;base64,${base64String}`} alt="" className="card-image-top" />
          </div>
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
        <button type="button" onClick={() => updateValue(false)}>
          Run
        </button>
        <button type="button" onClick={() => updateValue(true)}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateUserchallenge: (userAnswer, userchallengeId, isSubmit) =>
    dispatch(updateUserchallenge(userAnswer, userchallengeId, isSubmit)),
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
});

const mapStateToProps = state => {
  return { challenge: state.individualChallenge };
};

export const IndividualChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_IndividualChallenge);
