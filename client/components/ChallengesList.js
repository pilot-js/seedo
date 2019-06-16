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
import { convertBufferToImgSrc } from '../utils';
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
        .then(() => setCollapseStatus(challengesCollapseStatus));
    } else {
      fetchChallenges()
        .then(resp => resp.challenges)
        .then(challenges => fetchCollapseStatus(challenges))
        .then(() => setCollapseStatus(challengesCollapseStatus));
    }
  }, [difficulty, searchTerm]);

  const solutionByChallengeId = challengeId => {
    if (userchallenge) {
      const solutions = userchallenge.filter(solution => solution.challengeId === challengeId);
      return solutions;
    }
  };

  const attemptedTimes = arr => {
    return arr.length;
  };

  const attemptedByUsers = arr => {
    const userIds = arr.reduce((acc, solution) => {
      if (!acc.includes(solution.userId)) {
        acc.push(solution.userId);
      }
      return acc;
    }, []);
    return userIds.length;
  };

  const avgScore = arr => {
    const totalScore = arr.reduce((acc, solution) => {
      acc += solution.grade;
      return acc;
    }, 0);
    const avgScore = totalScore / arr.length ? Math.round(totalScore / arr.length) : 0;
    return avgScore;
  };

  const solutionCompleted = (arr, userId) => {
    return arr.reduce((acc, solution) => {
      if (solution.userId === userId) {
        acc = true;
      }
      return acc;
    }, false);
  };

  const collapseController = id => {
    setCollapseStatus(prevState => {
      return { ...prevState, [id]: !collapseStatus[id] };
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Our Challenges</h1>
      </div>
      <Search history={history} searchTerm={searchTerm} />
      <div>
        {challenges.map(challenge => {
          const imageSrc = challenge.images[0].data;
          return (
            <div
              className="card d-inline-flex"
              style={{ width: '25%', marginRight: '1em', marginBottom: '1em' }}
              key={challenge.id}
            >
              <div className="card-body">
                <img src={imageSrc} alt="" className="card-image-top" />
                <h5 className="card-title">{challenge.name}</h5>
                <p className="card-text">{challenge.description}</p>
                <Link to={`/challenges/${challenge.id}`} className="btn btn-primary">
                  Go to Challenge
                </Link>
                <button type="button" onClick={() => collapseController(challenge.id)}>
                  More info
                </button>
                <Collapse
                  isOpened={collapseStatus[challenge.id] ? collapseStatus[challenge.id] : false}
                >
                  <div>
                    {solutionByChallengeId(challenge.id) ? (
                      <div>
                        <p>Statistic</p>
                        <p>
                          Attempted: {attemptedTimes(solutionByChallengeId(challenge.id))}{' '}
                          {attemptedTimes(solutionByChallengeId(challenge.id)) > 1
                            ? 'times'
                            : 'time'}
                        </p>
                        <p>
                          Attempted by number of Users:{' '}
                          {attemptedByUsers(solutionByChallengeId(challenge.id))}
                        </p>
                        <p>Average Score: {avgScore(solutionByChallengeId(challenge.id))}</p>
                        <div>
                          {solutionCompleted(solutionByChallengeId(challenge.id), user.id) ? (
                            <MdCheckmarkCircle fontSize="30px" color="#43853d" />
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </Collapse>
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
