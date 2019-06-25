import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IosCreate from 'react-ionicons/lib/IosCreate';
import MdRefresh from 'react-ionicons/lib/MdRefresh';

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
      <div className="col-sm-4">
        <h3>My Submission</h3>
        <img className="border" src={userImage} alt="Yours" />
      </div>
      <div className="col-sm-4">
        <h3>Solution</h3>
        <img className="border" src={solutionImage} alt="Solution" />
      </div>
      <div className="col-sm-4">
        <h3 className="text-danger">Difference</h3>
        <img className="border" src={diffImage} alt="Diff" />
        <p id="difference-comment">difference shown in red</p>
      </div>
    </div>
    <hr />
    <div className="d-flex justify-content-around row">
      {grade === 100 ? (
        <h4 className="d-flex text-success align-items-center">Congrats, Perfect Match!</h4>
      ) : (
        <h4 className="d-flex align-items-center">Pixels Match: {grade}%</h4>
      )}
      <div className="d-flex align-items-center btn-group" role="group">
        <Link to={`/solutions/${userchallengeId}/challenges/${challengeId}`}>
          <button
            className="btn btn-sm-custom btn-success btn-raised mr-2"
            type="button"
            onClick={() => submit()}
          >
            <IosCreate fontSize="2em" color="#fff" />
            Submit answer!
          </button>
        </Link>
        <button
          className="btn btn-sm-custom btn-info btn-raised mr-2"
          onClick={closeModal}
          type="button"
        >
          <MdRefresh fontSize="2em" color="#fff" />
          Continue designing...
        </button>
      </div>
    </div>
  </div>
);
