import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../store';

const _AdminUsers = props => {
  useEffect(() => {
    props.fetchUsers();
    console.log('props: ', props);
  }, []);

  console.log('users: ', props.users);
  return (
    <div>
      <h1>Users</h1>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Archive | Delete</th>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  console.log('users: ', users);
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
