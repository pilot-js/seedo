import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = props => {
  const TopNavLinks = [
    {
      label: 'About Us',
      to: '/',
    },
    {
      label: 'Challenges List',
      to: '/challengesList',
    },
  ];
  let BottomNavLinks = [];
  if (props.user.id) {
    BottomNavLinks = [
      {
        label: 'Meet The Team',
        to: '/meetTheTeam',
      },
      {
        label: 'Logout',
        to: '/logout',
      },
    ];
  } else {
    BottomNavLinks = [
      {
        label: 'Meet The Team',
        to: '/meetTheTeam',
      },
      {
        label: 'Login/SignUp',
        to: '/login',
      },
    ];
  }
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export const Nav = connect(mapStateToProps)(_Nav);
