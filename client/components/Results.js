import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Results = ({
  userImage,
  solutionImage,
  diffImage,
  grade,
  closeModal,
  submit,
  userchallengeId,
  challengeId,
}) => (
  <div id="results-modal" className="" style={{ width: '100%', height: '100%' }}>
    <div className="d-flex row">
      <div className="col-sm-6">
        <h3>My Submission</h3>
        <img className="border" src={userImage} alt="Yours" />
      </div>
      <div className="col-sm-6">
        <h3>Solution</h3>
        <img className="border" src={solutionImage} alt="Solution" />
      </div>
    </div>
    <hr />
    <div className="d-flex justify-content-center row">
      <div className="col-sm-6">
        <h3>Difference</h3>
        <p id="difference-comment">difference shown in red</p>
        <img className="border" src={diffImage} alt="Diff" />
      </div>
      {/* <div
    className="d-flex flex-column justify-content-around"
    style={{ width: '100%', height: '100%' }}
  >
    <div className="d-flex justify-content-around row">
      <img src={userImage} alt="Yours" className="card-image col" />
      <img src={solutionImage} alt="Solution" className="card-image col" />
      <img src={diffImage} alt="Diff" className="card-image col" /> */}
    </div>
    <div className="d-flex justify-content-around row">
      <h4 className="d-flex align-items-center">Your grade: {grade}</h4>
      <div className="d-flex align-items-center btn-group" role="group">
        <Link to={`/solutions/${userchallengeId}/challenges/${challengeId}`}>
          <button className="btn btn-sm btn-success" type="button" onClick={() => submit()}>
            Submit answer!
          </button>
        </Link>
        <button className="btn btn-sm btn-info" onClick={closeModal} type="button">
          Continue designing...
        </button>
      </div>
    </div>
  </div>
);
