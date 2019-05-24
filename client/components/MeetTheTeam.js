import React from 'react';

export const MeetTheTeam = () => {
  const names = ['Grant', 'Theo', 'Kristy', 'Haoyu'];
  return (
    <div>
      {names.map(name => (
        <div>{name}</div>
      ))}
    </div>
  );
};
