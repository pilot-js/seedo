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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink class="navbar-brand" href="#">
        Image maybe?
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {navLinks.map(link => (
            <li className="nav-item">
              <NavLink exact key={link.to} to={link.to} className="nav-link">
                {link.label}
              </NavLink>
            </li>
          ))}
          {props.user.type === 'admin' ? (
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {adminNavLinks.map(link => (
                  <NavLink exact key={link.to} to={link.to} className="dropdown-item">
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export const Nav = connect(mapStateToProps)(_Nav);
