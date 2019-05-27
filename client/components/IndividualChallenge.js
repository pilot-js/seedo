import React from 'react';

export const IndividualChallenge = () => {
  const challenge = { name: 'challenge1', description: 'draw a circle', difficulty: 1 };
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
          <div className="col">HTML Editor</div>
          <div className="col">CSS Editor</div>
          <div className="col">JS Editor</div>
        </div>
      </div>
    </div>
  );
};
