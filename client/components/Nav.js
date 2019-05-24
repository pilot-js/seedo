import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const navLinks = [
    {
      label: 'WebName',
      to: '/',
    },
    {
      label: 'AboutUs',
      to: '/',
    },
    {
      label: 'MeetTheTeam',
      to: '/meetTheTeam',
    },
    {
      label: 'ChallengesList',
      to: '/challengesList',
    },
    {
      label: 'Login/SignUp',
      to: '/login',
    },
  ];
  return (
    <div className="nav nav-pills" style={{ marginBottom: '20px', marginTop: '10px' }}>
      {navLinks.map(link => (
        <div key={link.to} className="nav-item">
          <Link to={link.to} className="nav-link">
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
};
