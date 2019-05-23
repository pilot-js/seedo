import React, { Component } from 'react';

class Challenges extends Component {
  render() {
    // fake some data to render
    const ChallengesToRender = [
      { name: 'challenge1', description: 'draw a circle', difficulty: 1 },
      { name: 'challenge2', description: 'draw a square', difficulty: 1 },
    ];
    return (
      <div>
        <ul>
          {ChallengesToRender.map((challenge, idx) => {
            return <li key={`${challenge.name}${idx}`}>{`${challenge.name}: ${challenge.description}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Challenges;
