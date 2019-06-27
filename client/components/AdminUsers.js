/* eslint indent: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdTrash from 'react-ionicons/lib/MdTrash';
import MdAdd from 'react-ionicons/lib/MdAdd';

import { fetchUsers } from '../store';

const _AdminUsers = props => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  const deleteUser = userId => {
    axios
      .delete(`/api/users/${userId}`)
      .then(() => props.fetchUsers())
      .catch(error => {
        // TODO display error msg in browser
        console.log('error:', error); // eslint-disable-line no-console
      });
  };

  const { users } = props;
  return (
    <div>
      <h1>Users</h1>
      <Link to="/admin/users/create">
        <button
          type="button"
          className="btn btn-sm-custom btn-primary btn-raised"
          title="Create New User"
        >
          <MdAdd fontSize="1.5rem" color="#fff" />
          Add
        </button>
      </Link>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Delete</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">User Page</th>
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
                        <Link to={`/admin/users/edit/${id}`}>
                          <button
                            type="button"
                            className="btn btn-sm-custom btn-secondary item-edit"
                            title="Edit User"
                          >
                            <MdCreate fontSize="1.7rem" color="#009688" />
                            Edit
                          </button>
                        </Link>
                        {/* TODO add archive link */}
                        {/* <Link
                        to="/"
                      >
                        <button type="button" className="btn btn-secondary item-archive" disabled>
                          Archive
                        </button>
                        </Link> */}
                        <button
                          type="button"
                          className="btn btn-sm-custom btn-secondary item-delete"
                          title="Delete User"
                          onClick={() => deleteUser(id)}
                        >
                          <MdTrash fontSize="1.7rem" color="#dc3545" />
                          Delete
                        </button>
                      </div>
                    </td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{type}</td>
                    <td>
                      <Link to={`/admin/userpage/${id}`}>user page</Link>
                    </td>
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
