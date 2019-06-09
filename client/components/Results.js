import React, { useState, useEffect } from 'react';

export const Results = ({ userImage, solutionImage, diffImage, grade, closeModal }) => (
  <div>
    <div className="d-flex flex-column justify-content-around">
      <div className="d-flex justify-content-around row">
        <img src={userImage} alt="Yours" />
        <img src={solutionImage} alt="Solution" />
        <img src={diffImage} alt="Diff" />
      </div>
      <div className="d-flex justify-content-around row">
        <h4>Your grade: {grade}</h4>
        <div className="btn-group" role="group">
          <button className="btn btn-sm btn-success" type="button">
            Submit answer!
          </button>
          <button className="btn btn-sm btn-info" onClick={closeModal} type="button">
            Continue designing...
          </button>
        </div>
      </div>
    </div>
  </div>
);
