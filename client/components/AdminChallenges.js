/* eslint indent: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchChallenges } from '../store';

const _AdminChallenges = props => {
  useEffect(() => {
    props.fetchChallenges();
  }, []);

  const deleteChallenge = challengeId => {
    axios
      .delete(`/api/challenges/${challengeId}`)
      .then(resp => {
        // TODO give ability to click Archive link or Cancel
        if (resp.data) {
          window.alert(resp.data);
        }
      })
      .then(() => props.fetchChallenges())
      .catch(error => {
        // TODO display error msg in browser
        console.log('error:', error);
      });
  };

  const { challenges } = props;
  return (
    <div id="admin-challenge">
      <h1 className="text-center">Challenges</h1>
      <Link to="/admin/challenge">
        <button type="submit" className="btn btn-primary btn-raised">
          Add Challenge
        </button>
      </Link>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Delete</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            {/* TODO set up link to popup to see image */}
            {/* <th scope="col">Image</th> */}
          </tr>
        </thead>
        <tbody>
          {challenges
            ? challenges.map(chall => {
                const { id, name, description, image } = chall;
                return (
                  <tr key={id}>
                    <td key={`td-${id}`}>
                      <div className="btn-group" role="group" aria-label="edit actions">
                        <Link to={`/admin/challenge/${id}`}>
                          <button type="button" className="btn btn-secondary item-edit">
                            Edit
                          </button>
                        </Link>
                        {/* TODO add archive link */}
                        {/* <Link
                          to="/"
                          // to={`/admin/challenge/${id}`}
                        >
                          <button type="button" className="btn btn-secondary item-archive" disabled>
                            Archive
                          </button>
                        </Link> */}
                        <button
                          type="button"
                          className="btn btn-secondary item-delete"
                          onClick={() => deleteChallenge(id)}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    {/* TODO link to popup image goes here */}
                    {/* <td>link to popup image goes here</td> */}
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
