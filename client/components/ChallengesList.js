import React from 'react';
import { Link } from 'react-router-dom';

const challengesSeed = [
  {
    id: 1,
    name: 'Make circle',
    description: 'Make a red circle with radius 100px',
    difficulty: 1,
  },
  {
    id: 2,
    name: 'Make square',
    description: 'Make a blue square that is 100px wide and high',
    difficulty: 1,
  },
];

export const ChallengesList = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Our Challenges</h1>
      </div>
      <div className="d-flex justify-content-around">
        {challengesSeed.map(challenge => (
          <div className="card" style={{ width: '20rem' }} key={challenge.id}>
            <img src="" alt="" className="card-image-top" />
            <div className="card-body">
              <h5 className="card-title">{challenge.name}</h5>
              <p className="card-text">{challenge.description}</p>
              <Link to={`/challenges/${challenge.id}`} className="btn btn-primary">
                Go to Challenge
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
