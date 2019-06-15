import React, { useEffect } from 'react';

export const AdminUsers = props => {
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
