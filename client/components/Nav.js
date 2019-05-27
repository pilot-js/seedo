import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  const navLinks = [
    {
      label: 'Web Name',
      to: '/',
    },
    {
      label: 'Meet The Team',
      to: '/meetTheTeam',
    },
    {
      label: 'Challenges List',
      to: '/challengesList',
    },
    {
      label: 'Login/SignUp',
      to: '/login',
    },
  ];
  return (
    <div
      className="d-flex justify-content-center nav nav-pills"
      style={{ marginBottom: '20px', marginTop: '10px' }}
    >
      {navLinks.map(link => (
        <NavLink exact key={link.to} to={link.to} className="nav-link nav-item">
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};
