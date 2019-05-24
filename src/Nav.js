import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const navLinks = [
    {
      label: 'Name',
      to: '/home',
    },
    {
      label: 'AboutUs',
      to: '/home',
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
    <div>
      <ul className="nav nav-pills">
        {navLinks.map(link => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
