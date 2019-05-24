import React from 'react';

const MeetTheTeam = () => {
  const names = ['Grant', 'Theo', 'Kristy', 'Haoyu'];
  return (
    <div>
      {names.map(name => (
        <span>{name}</span>
      ))}
    </div>
  );
};

export default MeetTheTeam;
