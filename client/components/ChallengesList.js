import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChallenges, fetchChallengesWithFilterAndSearch } from '../store';
import { convertBufferToImgSrc } from '../utils';
import { Search } from './Search';

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchChallengesWithFilterAndSearch: (difficulty, term) =>
    dispatch(fetchChallengesWithFilterAndSearch(difficulty, term)),
});

const mapStateToProps = ({ challenges }) => ({ challenges });

const component = ({
  challenges,
  fetchChallenges,
  fetchChallengesWithFilterAndSearch,
  match,
  history,
}) => {
  const { searchTerm, difficulty } = match.params;
  let filter = {};

  useEffect(() => {
    if (difficulty) {
      filter = difficulty;
      fetchChallengesWithFilterAndSearch(filter, searchTerm);
    } else {
      fetchChallenges();
    }
  }, [difficulty, searchTerm]);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Our Challenges</h1>
      </div>
      <Search history={history} searchTerm={searchTerm} />
      <div className="d-flex justify-content-around">
        {challenges.map(challenge => {
          const images = challenge.images ? challenge.images : [{ data: { data: [1] } }];
          const image = images[0];
          const imageSrc = convertBufferToImgSrc(image.data);
          return (
            <div className="card" style={{ width: '20rem' }} key={challenge.id}>
              <div className="card-body">
                <img src={imageSrc} alt="" className="card-image-top" />
                <h5 className="card-title">{challenge.name}</h5>
                <p className="card-text">{challenge.description}</p>
                <Link to={`/challenges/${challenge.id}`} className="btn btn-primary">
                  Go to Challenge
                </Link>
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
