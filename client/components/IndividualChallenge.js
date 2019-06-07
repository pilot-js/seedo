import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { updateUserchallenge, fetchOneChallenge, fetchUserchallenge } from '../store';
import { convertBufferToImgSrc } from '../utils';
import { Link } from 'react-router-dom';

const _IndividualChallenge = ({individualChallenge, userchallenge, updateUserchallenge, user, fetchOneChallenge, challengeId }) => {
  useEffect(() => {
    // TODO: pull active userchallenge if no id specified
    // if (userchallengeId) {
    //   fetchUserchallenge(userchallenge.Id);
    // } else {
    //   fetchActiveUserchallenge(challengeId, props.userId);
    // };
    if (user.id) {
      fetchUserchallenge(user.id, challengeId);
    }

    fetchOneChallenge(challengeId);
  }, []);
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');

  const changeValue = () => {
    // TODO: axios post call to the backend
    console.log({ html, css, js });
  };

  const updateValue = isSubmit => {
    const userAnswer = { html, css, js, submitted: true, challengeId: challengeId };
     updateUserchallenge(userAnswer, challengeId, isSubmit)
      .then(userchallenge => console.log(userchallenge))
      .catch(ex => console.log(ex));
  };

  console.log(userchallenge);

  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };
  let imgSrc2;
  if (Object.keys(individualChallenge).length === 0) {
    return null;
  }
  if (userchallenge.images) {
    const { images } = userchallenge;
    imgSrc2 = images.length ? convertBufferToImgSrc(images[0].data) : '';
  }
  const { name, description, images, comments } = individualChallenge;

  const imgSrc = convertBufferToImgSrc(images[0].data);
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{name}</h1>
      <p>{description}</p>
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
      <div className="d-flex justify-content-between row" style={{ width: '100%' }}>
        <div className="col">
          <h2>HTML</h2>
          <CodeMirror
            value={html}
            onChange={(value, eventData) => setHTML(value)}
            options={options}
          />
          <button name="codeHTML" type="button" className="btn btn-success btn-outline btn-sm" onClick={changeValue}>
            save
          </button>
        </div>
        <div className="col">
          <h2>CSS</h2>
          <CodeMirror
            value={css}
            onChange={(value, eventData) => setCSS(value)}
            options={options}
          />
          <button name="codeCSS" type="button" className="btn btn-success btn-outline btn-sm" onClick={changeValue}>
            save
          </button>
        </div>
        <div className="col">
          <h2>JS</h2>
          <CodeMirror
            value={js}
            onChange={(value, eventData) => setJS(value)}
            options={options}
          />
          <button name="codeJS" type="button" className="btn btn-success btn-outline btn-sm" onClick={changeValue}>
            save
          </button>
        </div>
      </div>
      <div className="row btn-group" role="group">
        <button className="btn btn-info btn-raised" type="button" onClick={() => updateValue(false)}>
          Run
        </button>
        <button className="btn btn-success btn-raised" type="button" onClick={() => updateValue(true)}>
          Submit
        </button>
      </div>
      <Link to={`/solutions/${userchallenge.id}/challenges/${individualChallenge.id}`}>
        <button type="button">
          Go to Solution
        </button>
      </Link>
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
