import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChallenges, fetchSearchChallenges, fetchFilterChallenges } from '../store';
import { convertBufferToImgSrc } from '../utils';
import { Search } from './Search';
import { Filter } from './Filter';

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchSearchChallenges: term => dispatch(fetchSearchChallenges(term)),
  fetchFilterChallenges: difficulty => dispatch(fetchFilterChallenges(difficulty)),
});

const mapStateToProps = ({ challenges }) => ({ challenges });

const component = props => {
  const { searchTerm, difficulty } = props.match.params;
  useEffect(() => {
    if (!searchTerm && !difficulty) {
      props.fetchChallenges();
    } else if (!difficulty) {
      props.fetchSearchChallenges(searchTerm);
    } else if (!searchTerm) {
      props.fetchFilterChallenges(difficulty);
    }
  }, [searchTerm, difficulty]);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Our Challenges</h1>
      </div>
      <Search history={props.history} term={props.match.params.searchTerm} />
      <Filter history={props.history} />
      <div className="d-flex justify-content-around">
        {props.challenges.map(challenge => {
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
