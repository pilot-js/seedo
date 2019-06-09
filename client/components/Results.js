import React, { useState, useEffect } from 'react';

export const Results = ({ userImage, solutionImage, diffImage, grade, closeModal }) => (
  <div
    className="d-flex flex-column justify-content-around"
    style={{ width: '100%', height: '100%' }}
  >
    <div className="d-flex justify-content-around row">
      <img src={userImage} alt="Yours" />
      <img src={solutionImage} alt="Solution" />
      <img src={diffImage} alt="Diff" />
    </div>
    <div className="d-flex justify-content-around row">
      <h4 className="d-flex align-items-center">Your grade: {grade}</h4>
      <div className="d-flex align-items-center btn-group" role="group">
        <button className="btn btn-sm btn-success" type="button">
          Submit answer!
        </button>
        <button className="btn btn-sm btn-info" onClick={closeModal} type="button">
          Continue designing...
        </button>
      </div>
    </div>
  </div>
);
