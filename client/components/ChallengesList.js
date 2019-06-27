import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MdCheckmarkCircle from 'react-ionicons/lib/MdCheckmarkCircle';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import { Collapse } from 'react-collapse';

import {
  fetchChallenges,
  fetchChallengesWithFilterAndSearch,
  fetchAllUserchallenges,
} from '../store';
import { Search } from './Search';
import { attemptedTimes, attemptedByUsers, avgScore, solutionCompleted } from '../utils';

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchChallengesWithFilterAndSearch: (difficulty, term) =>
    dispatch(fetchChallengesWithFilterAndSearch(difficulty, term)),
  fetchAllUserchallenges: () => dispatch(fetchAllUserchallenges()),
});

const mapStateToProps = ({ challenges, userchallenge, user }) => ({
  challenges,
  userchallenge,
  user,
});

const component = ({
  challenges,
  fetchChallenges,
  fetchChallengesWithFilterAndSearch,
  fetchAllUserchallenges,
  userchallenge,
  match,
  history,
  user,
}) => {
  const { searchTerm, difficulty } = match.params;
  let filter = {};

  const challengesCollapseStatus = {};
  const [collapseStatus, setCollapseStatus] = useState({});

  const fetchCollapseStatus = arr => {
    if (arr.length > 1) {
      arr.forEach(challenge => {
        challengesCollapseStatus[challenge.id] = false;
      });
    }
  };

  useEffect(() => {
    fetchAllUserchallenges();
    if (difficulty) {
      filter = difficulty;
      fetchChallengesWithFilterAndSearch(filter, searchTerm)
        .then(resp => resp.challenges)
        .then(challenges => fetchCollapseStatus(challenges))
        .then(() => setCollapseStatus(challengesCollapseStatus))
        .catch(err => console.log(err)); // eslint-disable-line no-console
    } else {
      fetchChallenges()
        .then(resp => resp.challenges)
        .then(challenges => fetchCollapseStatus(challenges))
        .then(() => setCollapseStatus(challengesCollapseStatus))
        .catch(err => console.log(err)); // eslint-disable-line no-console
    }
  }, [difficulty, searchTerm]);

  const solutionByChallengeId = challengeId => {
    if (userchallenge instanceof Array) {
      const solutions = userchallenge.filter(
        solution => solution.challengeId === challengeId && solution.submitted,
      );
      return solutions;
    }
  };

  const collapseController = id => {
    setCollapseStatus(prevState => {
      return { ...prevState, [id]: !collapseStatus[id] };
    });
  };

  return (
    <div id="challenges-list">
      <h1 className="mb-0">Challenges</h1>
      <Search history={history} searchTerm={searchTerm} />
      <div className="row">
        {challenges.map(challenge => {
          const imageSrc = challenge.images[0] ? challenge.images[0].data : null;
          return (
            <div className="col-sm-4" key={challenge.id}>
              <div className="card d-inline-flex" key={challenge.id}>
                <img src={imageSrc} alt="" className="card-image-top card-image" />
                <div className="card-body">
                  <div className="float-left">
                    {solutionCompleted(solutionByChallengeId(challenge.id), user.id) ? (
                      <MdCheckmarkCircle fontSize="25px" color="#43853d" />
                    ) : null}
                  </div>
                  <div className="float-right">
                    <span className="badge badge-custom">{challenge.difficulty}</span>
                  </div>
                  <h3 className="card-title text-center">{challenge.name}</h3>
                  <div className="clearfix" />
                  <div className="d-flex justify-content-center">
                    <Link to={`/challenges/${challenge.id}`}>
                      <button type="button" className="btn btn-raised btn-primary btn-sm mr-2">
                        Go to Challenge
                      </button>
                    </Link>
                    <button
                      id="btn-less-more"
                      className="btn btn-raised btn-secondary more-info btn-sm"
                      type="button"
                      onClick={() => collapseController(challenge.id)}
                    >
                      {collapseStatus[challenge.id] || false ? (
                        <span>
                          Less info
                          <MdArrowDropup fontSize="20px" color="#fff" />
                        </span>
                      ) : (
                        <span>
                          More info
                          <MdArrowDropdown fontSize="20px" color="#fff" />
                        </span>
                      )}
                    </button>
                  </div>
                  <Collapse
                    isOpened={collapseStatus[challenge.id] ? collapseStatus[challenge.id] : false}
                  >
                    <hr />
                    <div id="challenge-info">
                      <h4 className="text-center">Challenge Info</h4>
                      <p className="card-text text-center">{challenge.description}</p>
                      <p className="text-center text-uppercase mr-3 mt-3">
                        <strong>Difficulty:</strong>{' '}
                        <span className="badge badge-custom">{challenge.difficulty}</span>
                      </p>
                      <hr />
                      {solutionByChallengeId(challenge.id) ? (
                        <div id="challenge-stats">
                          <h4 className="text-center">Challenge Stats</h4>
                          <table>
                            <tbody>
                              <tr>
                                <td># My Attempts:</td>
                                <td>{attemptedTimes(solutionByChallengeId(challenge.id))}</td>
                              </tr>
                              <tr>
                                <td># Users Attempted:</td>
                                <td>{attemptedByUsers(solutionByChallengeId(challenge.id))}</td>
                              </tr>
                              <tr>
                                <td>Average Score:</td>
                                <td>{avgScore(solutionByChallengeId(challenge.id))}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ChallengesList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
