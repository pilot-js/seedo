/* eslint indent: 1 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchChallenges } from '../store';

const _AdminChallenges = props => {
  useEffect(() => {
    props.fetchChallenges();
  }, []);

  console.log('challenges: ', props.challenges);
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
            <th scope="col">Edit / Delete</th>
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
                    <td />
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>image goes here</td>
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
