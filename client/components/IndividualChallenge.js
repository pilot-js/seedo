import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Results } from './Results';
import {
  updateUserchallenge,
  fetchOneChallenge,
  fetchUserchallenge,
  fetchUserchallengeById,
} from '../store';
import { convertBufferToImgSrc } from '../utils';

const _IndividualChallenge = ({
  individualChallenge,
  userchallenge,
  updateUserchallenge,
  user,
  fetchOneChallenge,
  fetchUserchallengeById,
  fetchUserchallenge,
  challengeId,
}) => {
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      fetchUserchallenge(user.id, challengeId);
    }
    fetchOneChallenge(challengeId);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showCodeMirror, setShowCodeMirror] = useState(true);
  const [loading, setLoading] = useState(false);
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');

  const changeValue = () => {
    // TODO: axios post call to the backend
  };

  const updateValue = (createDiff, isSubmit = false) => {
    setLoading(true);
    const userAnswer = { html, css, js, challengeId };
    if (user.id) {
      updateUserchallenge(userAnswer, userchallenge.id, createDiff, isSubmit)
        .then(() => {
          setShowModal(createDiff);
          setShowCodeMirror(!createDiff);
          setLoading(false);
        })
        .catch(ex => console.log(ex));
    } else {
      setLoading(false);
      window.alert('Please login for submitting solution.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowCodeMirror(true);
  };

  const options = {
    lineNumbers: true,
    mode: 'javascript',
  };
  if (Object.keys(individualChallenge).length === 0) {
    return null;
  }
  let userImage;
  if (userchallenge.images) {
    const { images } = userchallenge;
    userImage = images.length ? convertBufferToImgSrc(images[0].data) : '';
  }
  let diffImage = '';
  if (userchallenge.diffImage) {
    diffImage = convertBufferToImgSrc(userchallenge.diffImage);
  }
  const { name, description, images, comments } = individualChallenge;

  const codeMirrorStyle = {
    width: '100%',
    visibility: showCodeMirror ? 'visible' : 'hidden',
  };
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(189, 195, 199, .8)',
    },
    content: {
      top: '50%',
      left: '50%',
      marginRight: '-25%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const solutionImage = convertBufferToImgSrc(images[0].data);
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="d-flex justify-content-between row" style={{ width: '100%' }}>
        <div className="d-flex justify-content-center col">
          <img src={userImage} alt="" className="card-image-top" />
        </div>
        <div className="d-flex justify-content-center col">
          <img src={solutionImage} alt="" className="card-image-top" />
        </div>
      </div>
      <div className="d-flex justify-content-between row" style={codeMirrorStyle}>
        <div className="col">
          <h2>HTML</h2>
          <CodeMirror
            value={html}
            onChange={(value, eventData) => setHTML(value)}
            options={options}
          />
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            style={customStyles}
            contentLabel="Test modal"
          >
            <Results
              userImage={userImage}
              solutionImage={solutionImage}
              diffImage={diffImage}
              grade={userchallenge.grade}
              closeModal={closeModal}
              submit={() => updateValue(true, true)}
              challengeId={challengeId}
              userchallengeId={userchallenge.id}
            />
          </Modal>
          <button
            name="codeHTML"
            type="button"
            className="btn btn-success btn-outline btn-sm"
            onClick={changeValue}
          >
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
          <button
            name="codeCSS"
            type="button"
            className="btn btn-success btn-outline btn-sm"
            onClick={changeValue}
          >
            save
          </button>
        </div>
      </div>
      <div className="row btn-group" role="group">
        <button
          className="btn btn-info btn-raised"
          type="button"
          onClick={() => updateValue(false)}
        >
          Run
        </button>
        <button
          className="btn btn-success btn-raised"
          type="button"
          onClick={() => updateValue(true)}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <Link to={`/solutions/${userchallenge.id}/challenges/${individualChallenge.id}`}>
        <button type="button" className="btn btn-danger">
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
  updateUserchallenge: (userAnswer, userchallengeId, createDiff, isSubmit) =>
    dispatch(updateUserchallenge(userAnswer, userchallengeId, createDiff, isSubmit)),
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchUserchallenge: (userId, challengeId) => dispatch(fetchUserchallenge(userId, challengeId)),
  fetchUserchallengeById: id => dispatch(fetchUserchallengeById(id)),
});

export const IndividualChallenge = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_IndividualChallenge);
