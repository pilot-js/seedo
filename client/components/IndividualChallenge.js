import React, { useState, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import MdCodeWorking from 'react-ionicons/lib/MdCodeWorking';
import MdCode from 'react-ionicons/lib/MdCode';

import { Results } from './Results';
import {
  updateUserchallenge,
  fetchOneChallenge,
  fetchUserchallenge,
  fetchUserchallengeById,
} from '../store';

require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/markdown/markdown');

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

  const options1 = {
    lineNumbers: true,
    mode: 'xml',
    theme: 'monokai',
  };

  const options2 = {
    lineNumbers: true,
    mode: 'css',
    theme: 'monokai',
  };

  if (Object.keys(individualChallenge).length === 0) {
    return null;
  }
  let userImage;
  if (userchallenge) {
    if (userchallenge.images && userchallenge.images instanceof Array) {
      const image = userchallenge.images[0];
      userImage = image ? image.data : null;
    }
  }
  let diffImage = '';
  if (userchallenge.diffImage) {
    diffImage = userchallenge.diffImage;
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
      top: '13%',
      left: '50%',
      marginRight: '-45%',
      transform: 'translate(-50%, 4%)',
      backgroundColor: 'rgba(230, 230, 230, 1)',
      bottom: '180px',
    },
  };
  const solutionImage = images[0].data;
  return (
    <div id="individual-challenge" className="d-flex flex-column align-items-center">
      <div className="d-flex flex-row">
        <div className="col-8">
          <h1>{name}</h1>
          <p className="text-center">{description}</p>
        </div>
        <div className="col-7 pl-0">
          <div className="row btn-group" role="group">
            <button
              className="btn btn-sm-custom btn-info btn-raised mr-2"
              type="button"
              onClick={() => updateValue(false)}
            >
              <MdRefresh fontSize="1.7em" color="#fff" />
              Preview
            </button>
            <button
              className="btn btn-sm-custom btn-success btn-raised mr-2"
              type="button"
              onClick={() => updateValue(true)}
            >
              <MdCodeWorking fontSize="1.7em" color="#fff" />
              {loading ? 'Loading...' : 'Compare'}
            </button>
          </div>
          <Link to={`/solutions/${userchallenge.id}/challenges/${individualChallenge.id}`}>
            <button type="button" className="btn btn-sm-custom btn-danger btn-raised">
              <MdCode fontSize="1.7em" color="#fff" />
              Solution
            </button>
          </Link>
        </div>
      </div>
      <div id="indiv-chall-top-row" className="d-flex row col-sm-12 justify-content-center">
        <div className="col-sm-6 text-center">
          <h2>My Image</h2>
          <img src={userImage} alt="" className="card-image mx-auto d-block" />
        </div>
        <div className="col-sm-6">
          <h2>Image to Match</h2>
          <img src={solutionImage} alt="" className="card-image mx-auto d-block" />
        </div>
      </div>
      <div className="d-flex justify-content-between row" style={codeMirrorStyle}>
        <div className="col">
          <h2>HTML</h2>
          <CodeMirror
            value={html}
            onChange={(value, eventData) => setHTML(value)}
            options={options1}
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
        </div>
        <div className="col">
          <h2>CSS</h2>
          <CodeMirror
            value={css}
            onChange={(value, eventData) => setCSS(value)}
            options={options2}
          />
        </div>
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
