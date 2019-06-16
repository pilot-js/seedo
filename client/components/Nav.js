import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = props => {
  const navLinks = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Challenges List',
      to: '/challenges',
    },
    {
      label: 'Team',
      to: '/team',
    },
  ];
  if (props.user.id) {
    navLinks.push(
      {
        label: 'User Page',
        to: '/userpage',
      },
      {
        label: 'Community',
        to: '/community',
      },
      {
        label: 'Logout',
        to: '/logout',
      },
    );
  } else {
    navLinks.push({
      label: 'Login/SignUp',
      to: '/login',
    });
  }
  let adminNavLinks = [];
  if (props.user.type === 'admin') {
    adminNavLinks = [
      {
        label: 'Challenges',
        to: '/admin/challenges',
      },
      {
        label: 'Users',
        to: '/admin/users',
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
          {navLinks.map(link => (
            <NavLink exact key={link.to} to={link.to} className="nav-link nav-item">
              {link.label}
            </NavLink>
          ))}
          {props.user.type === 'admin' ? (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
              >
                Admin
              </button>
              <div className="dropdown-menu">
                {adminNavLinks.map(link => (
                  <NavLink exact key={link.to} to={link.to} className="dropdown-item">
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export const Nav = connect(mapStateToProps)(_Nav);
