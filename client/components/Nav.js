import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  const TopNavLinks = [
    {
      label: 'About Us',
      to: '/',
    },
    {
      label: 'Challenges List',
      to: '/challenges',
    },
  ];
  const BottomNavLinks = [
    {
      label: 'Meet The Team',
      to: '/team',
    },
    {
      label: 'Login/SignUp',
      to: '/login',
    },
  ];
  return (
    <div className="d-flex flex-row">
      <div style={{ flex: 2, textAlign: 'center', alignItems: 'center' }}>image Here</div>
      <div
        className="d-flex flex-column justify-content-center nav nav-pills"
        style={{ flex: 3, marginBottom: '20px', marginTop: '10px' }}
      >
        <div className="flex-row nav nav-pills">
          {TopNavLinks.map(link => (
            <NavLink exact key={link.to} to={link.to} className="nav-link nav-item">
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex-row nav nav-pills">
          {BottomNavLinks.map(link => (
            <NavLink exact key={link.to} to={link.to} className="nav-link nav-item">
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
