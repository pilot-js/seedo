import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChallenges, fetchSearchChallenges } from '../store';
import { convertBufferToImgSrc } from '../utils';
import { Search } from './Search';

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(fetchChallenges()),
  fetchSearchChallenges: term => dispatch(fetchSearchChallenges(term)),
});

const mapStateToProps = ({ challenges }) => ({ challenges });

const component = props => {
  useEffect(() => {
    if (!props.match.params.searchTerm) {
      props.fetchChallenges();
    } else {
      props.fetchSearchChallenges(props.match.params.searchTerm);
    }
  }, [props.match.params.searchTerm]);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Our Challenges</h1>
      </div>
      <Search history={props.history} term={props.match.params.searchTerm} />
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
