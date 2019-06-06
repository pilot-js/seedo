import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { updateUserchallenge, fetchOneChallenge, fetchUserchallenge } from '../store';
import { convertBufferToImgSrc } from '../utils';

const _IndividualChallenge = props => {
  useEffect(() => {
    // TODO: pull active userchallenge if no id specified
    // if (props.userchallengeId) {
    //   fetchUserchallenge(props.userchallenge.Id);
    // } else {
    //   fetchActiveUserchallenge(props.challengeId, props.userId);
    // };
    if (props.user.id) {
      props.fetchUserchallenge(Number(props.user.id), Number(props.challengeId));
    }

    props.fetchOneChallenge(Number(props.challengeId));
  }, []);
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');

  const changeValue = () => {
    // TODO: axios post call to the backend
    console.log({ html, css, js });
  };

  const updateValue = isSubmit => {
    const userAnswer = { html, css, js, submitted: true, challengeId: props.challengeId };
    props
      .updateUserchallenge(userAnswer, props.challengeId, isSubmit)
      .then(userchallenge => console.log(userchallenge))
      .catch(ex => console.log(ex));
  };

  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };
  let imgSrc2;
  if (Object.keys(props.individualChallenge).length === 0) {
    return null;
  }
  if (Object.keys(props.userchallenge).length !== 0) {
    const { images } = props.userchallenge;
    imgSrc2 = convertBufferToImgSrc(images[0].data);
  }
  const { name, description, images } = props.individualChallenge;

  const imgSrc = convertBufferToImgSrc(images[0].data);
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{name}</h1>
      <p>{description}</p>
      <div>
        <div className="row">
          <div className="col">
            users page goes here:
            <img src={imgSrc2} alt="" className="card-image-top" />
          </div>
          <div className="col">
            our image goes here:
            <img src={imgSrc} alt="" className="card-image-top" />
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

const mapStateToProps = ({ user, individualChallenge, userchallenge }) => ({
  user,
  individualChallenge,
  userchallenge,
});

const mapDispatchToProps = dispatch => ({
  updateUserchallenge: (userAnswer, userchallengeId, isSubmit) =>
    dispatch(updateUserchallenge(userAnswer, userchallengeId, isSubmit)),
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchUserchallenge: (userId, challengeId) => dispatch(fetchUserchallenge(userId, challengeId)),
});

export const IndividualChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_IndividualChallenge);
