/* eslint indent: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchChallenges } from '../store';

const _AdminChallenges = props => {
  useEffect(() => {
    props.fetchChallenges();
  }, []);

  const { challenges } = props;
  return (
    <div>
      <h1>Challenges</h1>
      <Link to="/admin/challenge">
        <button type="submit">Add Challenge</button>
      </Link>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Delete</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {challenges
            ? challenges.map(chall => {
              const { id, name, description, image } = chall;
              return (
                <tr key={id}>
                  <td>
                    <Link to="/" className="item-delete" style={{ marginRight: '1rem' }}>
                      Del
                      </Link>
                    <Link to="/" className="item-edit">
                      Edit
                      </Link>
                  </td>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{description}</td>
                  {/* TODO link to popup image goes here */}
                  <td>link to popup image goes here</td>
                </tr>
              );
            })
            : ''}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ challenges }) => {
  return { challenges };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChallenges: () => dispatch(fetchChallenges()),
  };
};

export const AdminChallenges = connect(
  mapStateToProps,

  mapDispatchToProps,
)(_AdminChallenges);
