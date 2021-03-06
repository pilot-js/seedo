import React from 'react';

export const MeetTheTeam = () => {
  const names = ['Grant', 'Theo', 'Kristy', 'Haoyu'];
  return (
    <div>
      <h1>Team</h1>
      <div className="d-flex flex-row justify-content-around">
        {names.map((name, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
};
