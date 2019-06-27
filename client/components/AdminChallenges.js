/* eslint indent: 0 */
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdTrash from 'react-ionicons/lib/MdTrash';
import MdAdd from 'react-ionicons/lib/MdAdd';

import { fetchChallenges, fetchAllUserchallenges } from '../store';
import { attemptedByUsers, avgScore } from '../utils';

const _AdminChallenges = props => {
  const { fetchChallenges, fetchAllUserchallenges, userchallenge } = props;

  useEffect(() => {
    fetchChallenges();
    fetchAllUserchallenges();
  }, []);

  // for stats
  const solutionByChallengeId = challengeId => {
    if (userchallenge instanceof Array) {
      const solutions = userchallenge.filter(
        solution => solution.challengeId === challengeId && solution.submitted,
      );
      return solutions;
    }
  };

  const deleteChallenge = challengeId => {
    axios
      .delete(`/api/challenges/${challengeId}`)
      .then(resp => {
        // TODO give ability to click Archive link or Cancel
        if (resp.data) {
          window.alert(resp.data); // eslint-disable-line no-alert
        }
      })
      .then(() => fetchChallenges())
      .catch(error => {
        // TODO display error msg in browser
        console.log('error:', error); // eslint-disable-line no-console
      });
  };

  const { challenges } = props;
  return (
    <div id="admin-challenge">
      <h1 className="text-center">Challenges</h1>
      <Link to="/admin/challenge">
        <button type="submit" className="btn btn-sm-custom btn-primary btn-raised">
          <MdAdd fontSize="1.5rem" color="#fff" />
          Add
        </button>
      </Link>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Edit | Delete</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col"># Users Attempted</th>
            <th scope="col">Avg Score</th>
            {/* TODO set up link to popup to see image */}
            {/* <th scope="col">Image</th> */}
          </tr>
        </thead>
        <tbody>
          {challenges
            ? challenges.map(chall => {
                const { id, name, description, difficulty, image } = chall;
                return (
                  <tr key={id}>
                    <td key={`td-${id}`}>
                      <div className="btn-group" role="group" aria-label="edit actions">
                        <Link to={`/admin/challenge/${id}`}>
                          <button
                            type="button"
                            className="btn btn-sm-custom btn-secondary item-edit"
                          >
                            <MdCreate fontSize="1.7rem" color="#009688" />
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
                          className="btn btn-sm-custom btn-secondary item-delete"
                          onClick={() => deleteChallenge(id)}
                        >
                          <MdTrash fontSize="1.7rem" color="#dc3545" />
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="text-center">{difficulty}</td>
                    <td>{name}</td>
                    <td>{description}</td>

                    {solutionByChallengeId(id) ? (
                      <Fragment>
                        <td className="text-center">
                          {attemptedByUsers(solutionByChallengeId(id))}
                        </td>
                        <td className="text-center">{avgScore(solutionByChallengeId(id))}</td>
                      </Fragment>
                    ) : (
                      ''
                    )}
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

const mapStateToProps = ({ challenges, userchallenge, user }) => ({
  challenges,
  userchallenge,
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChallenges: () => dispatch(fetchChallenges()),
    fetchAllUserchallenges: () => dispatch(fetchAllUserchallenges()),
  };
};

export const AdminChallenges = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_AdminChallenges);
