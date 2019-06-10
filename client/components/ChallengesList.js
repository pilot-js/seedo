import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChallenges, fetchFilterChallenges, fetchSrchFltrChal } from '../store';
import { convertBufferToImgSrc } from '../utils';
import { Search } from './Search';

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchFilterChallenges: difficulty => dispatch(fetchFilterChallenges(difficulty)),
  fetchSrchFltrChal: (difficulty, term) => dispatch(fetchSrchFltrChal(difficulty, term)),
});

const mapStateToProps = ({ challenges }) => ({ challenges });

const component = ({
  challenges,
  fetchChallenges,
  fetchFilterChallenges,
  fetchSrchFltrChal,
  match,
  history,
}) => {
  const { searchTerm, difficulty } = match.params;

  useEffect(() => {
    if (difficulty && !searchTerm) {
      fetchFilterChallenges(difficulty);
    } else if (difficulty && searchTerm) {
      fetchSrchFltrChal(difficulty, searchTerm);
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
          const imageSrc = convertBufferToImgSrc(challenge.images[0].data);
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
