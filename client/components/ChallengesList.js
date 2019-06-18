import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MdCheckmarkCircle from 'react-ionicons/lib/MdCheckmarkCircle';
import { Collapse } from 'react-collapse';
import {
  fetchChallenges,
  fetchChallengesWithFilterAndSearch,
  fetchAllUserchallenges,
} from '../store';
import { Search } from './Search';

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
        .catch(err => console.log(err));
    } else {
      fetchChallenges()
        .then(resp => resp.challenges)
        .then(challenges => fetchCollapseStatus(challenges))
        .then(() => setCollapseStatus(challengesCollapseStatus))
        .catch(err => console.log(err));
    }
  }, [difficulty, searchTerm]);

  const solutionByChallengeId = challengeId => {
    if (userchallenge instanceof Array) {
      const solutions = userchallenge.filter(solution => solution.challengeId === challengeId);
      return solutions;
    }
  };

  const attemptedTimes = arr => {
    if (arr instanceof Array) {
      return arr.length;
    }
  };

  const attemptedByUsers = arr => {
    if (arr instanceof Array) {
      const userIds = arr.reduce((acc, solution) => {
        if (!acc.includes(solution.userId)) {
          acc.push(solution.userId);
        }
        return acc;
      }, []);
      return userIds.length;
    }
  };

  const avgScore = arr => {
    if (arr instanceof Array) {
      const totalScore = arr.reduce((acc, solution) => {
        acc += solution.grade;
        return acc;
      }, 0);
      const avgScore = totalScore / arr.length ? Math.round(totalScore / arr.length) : 0;
      return avgScore;
    }
  };

  const solutionCompleted = (arr, userId) => {
    if (arr instanceof Array) {
      return arr.reduce((acc, solution) => {
        if (solution.userId === userId) {
          acc = true;
        }
        return acc;
      }, false);
    }
  };

  const collapseController = id => {
    setCollapseStatus(prevState => {
      return { ...prevState, [id]: !collapseStatus[id] };
    });
  };

  return (
    <div>
      {/* <div className="d-flex justify-content-center"> */}
      <h1 className="text-center">Challenges</h1>
      {/* </div> */}
      <Search history={history} searchTerm={searchTerm} />
      <div className="row">
        {challenges.map(challenge => {
          const imageSrc = challenge.images[0] ? challenge.images[0].data : null;
          return (
            <div className="col-sm-4" key={challenge.id}>
              <div
                className="card d-inline-flex"
                // style={{ width: '25%', marginRight: '1em', marginBottom: '1em' }}
                key={challenge.id}
              >
                <img src={imageSrc} alt="" className="card-image-top card-image" />
                <div className="card-body">
                  <div className="float-right">
                    {solutionCompleted(solutionByChallengeId(challenge.id), user.id) ? (
                      <MdCheckmarkCircle fontSize="25px" color="#43853d" />
                    ) : null}
                  </div>
                  <h3 className="card-title text-center">{challenge.name}</h3>
                  <p className="card-text text-center">{challenge.description}</p>
                  <Link to={`/challenges/${challenge.id}`}>
                    <button type="button" className="btn btn-raised btn-primary mr-2">
                      Go to Challenge
                    </button>
                  </Link>
                  <button
                    className="btn btn-raised btn-secondary more-info"
                    type="button"
                    onClick={() => collapseController(challenge.id)}
                  >
                    {collapseStatus[challenge.id] || false ? 'Less info' : 'More info'}
                  </button>
                  <Collapse
                    isOpened={collapseStatus[challenge.id] ? collapseStatus[challenge.id] : false}
                  >
                    <div>
                      {solutionByChallengeId(challenge.id) ? (
                        <div>
                          <p>Challenge Statistics</p>
                          <p>
                            # My Attempts: {attemptedTimes(solutionByChallengeId(challenge.id))}
                          </p>
                          <p>
                            # Users Attempted:{' '}
                            {attemptedByUsers(solutionByChallengeId(challenge.id))}
                          </p>
                          <p>Average Score: {avgScore(solutionByChallengeId(challenge.id))}</p>
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
