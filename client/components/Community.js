/* eslint indent: 0 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChallenges, fetchAllUserchallenges } from '../store';

// should we creat two thunks for fetching solutions and comments by challengeId
const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchAllUserchallenges: () => dispatch(fetchAllUserchallenges()),
});

const mapStateToProps = ({ user, challenges, userchallenge }) => ({
  user,
  challenges,
  userchallenge,
});

const checkSumbitted = (challenge, userchallenge) => {
  const matchedUserChallenge = userchallenge.find(
    userChal => userChal.challengeId === challenge.id,
  );
  if (matchedUserChallenge && matchedUserChallenge.submitted) {
    return true;
  }
  return false;
};

const _communitySolutionComments = ({
  challenges,
  fetchChallenges,
  fetchAllUserchallenges,
  userchallenge,
  user,
}) => {
  useEffect(() => {
    fetchChallenges();
    fetchAllUserchallenges();
  }, []);
  return (
    <div>
      <h1 className="text-center">Solution and Comments</h1>
      <ul className="list-group">
        {challenges.map(challenge => {
          let image;
          if (challenge.images instanceof Array) {
            image = challenge.images.length > 0 ? challenge.images[0] : { data: null };
          }
          return (
            <li key={challenge.id} className="d-flex list-group-item">
              <div className="col d-flex flex-column align-items-center justify-content-around">
                <Link
                  to={`/community/challenge/${challenge.id}`}
                  className="d-flex justify-content-center"
                  onClick={e => {
                    if (checkSumbitted(challenge, userchallenge)) {
                      return null;
                    }
                    e.preventDefault();
                  }}
                >
                  <h2>{challenge.name}</h2>
                </Link>
                <p>{challenge.description}</p>
                <br />
                <p>Difficulty: {challenge.difficulty} / 5</p>
              </div>
              <div className="col">
                <img src={image.data} className="card-image" alt="challenge" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const Community = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_communitySolutionComments);
