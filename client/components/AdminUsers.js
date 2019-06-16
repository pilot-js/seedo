/* eslint indent: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchUsers } from '../store';

const _AdminUsers = props => {
  useEffect(() => {
    props.fetchUsers();
  }, [props.users]);

  const deleteUser = userId => {
    axios
      .delete(`/api/users/${userId}`)
      .then(status => {
        // TODO display 'User deleted'
        console.log('status: ', status.data);
      })
      .catch(error => {
        // TODO display error msg in browser
        console.log('error:', error);
      });
  };

  const { users } = props;
  return (
    <div>
      <h1>Users</h1>
      <Link to="/admin/users/create">
        <button type="submit">Add User</button>
      </Link>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Archive | Delete</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map(user => {
                const { id, firstName, lastName, email, type } = user;
                return (
                  <tr key={id}>
                    <td>
                      <div className="btn-group" role="group" aria-label="edit actions">
                        <Link to={`/admin/users/${id}`}>
                          <button type="button" className="btn btn-secondary item-edit">
                            Edit
                          </button>
                        </Link>
                        {/* <Link
                        to="/"
                      > */}
                        <button type="button" className="btn btn-secondary item-archive" disabled>
                          Archive
                        </button>
                        {/* </Link> */}
                        <button
                          type="button"
                          className="btn btn-secondary item-delete"
                          onClick={() => deleteUser(id)}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{type}</td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  // console.log('users: ', users);
  return {
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export const AdminUsers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_AdminUsers);
