import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = props => {
  let navLinks = [
    {
      label: 'About Us',
      to: '/',
    },
    {
      label: 'Challenges List',
      to: '/challengesList',
    },
    {
      label: 'Meet The Team',
      to: '/meetTheTeam',
    },
  ];
  if (props.user.id) {
    navLinks.push(
      {
        label: 'Logout',
        to: '/logout',
      },
      {
        label: 'User Page',
        to: '/userpage',
      },
    );
  } else {
    navLinks.push({
      label: 'Login/SignUp',
      to: '/login',
    });
  }

  return (
    <div className="d-flex flex-row">
      <div style={{ flex: 2, textAlign: 'center', alignItems: 'center' }}>image Here</div>
      <div
        className="d-flex flex-column justify-content-center nav nav-pills"
        style={{ flex: 3, marginBottom: '20px', marginTop: '10px' }}
      >
        <div className="flex-row nav nav-pills">
          {navLinks.map(link => (
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
