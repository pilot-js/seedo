import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { fetchImages } from '../store';

const mapStateToProps = ({ images }) => ({ images });

const mapDispatchToProps = dispatch => ({ fetchImages: () => dispatch(fetchImages()) });

const _Home = ({ images, fetchImages }) => {
  useEffect(() => {
    fetchImages().catch(e => console.error(e)); // eslint-disable-line no-console
  }, []);

  let imageList = [];

  if (images instanceof Array) {
    imageList = images;
  }

  return (
    <div id="home" className="d-flex flex-column align-items-center">
      <h1>Visual Design Challenges for Developers</h1>
      <div className="d-flex justify-content-evenly">
        <div className="col">
          <Carousel>
            {imageList.map(image => (
              <div key={image.id}>
                <img src={image.data} alt={image.challenge.name} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="col">
          <p>
            We built a platform designed to help developers{' '}
            <strong>practice and learn HTML and CSS</strong> by reproducing images.
          </p>
          <p>Are you a visual learner?</p>
          <p>Want to get better at visual design?</p>
          <p>Great! Then you are at the right place.</p>
          <p>We provide you with an image, and your task is to recreate it using HTML and CSS.</p>
          <div className="text-center">
            <h3>Ready for a challenge?</h3>
            <Link to="/login">
              <button type="button" className="btn btn-primary btn-raised mt-4">
                Challenge Me!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Home);
