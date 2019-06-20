import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { fetchImages } from '../store';

const mapStateToProps = ({ images }) => ({ images });

const mapDispatchToProps = dispatch => ({ fetchImages: () => dispatch(fetchImages()) });

const _Home = ({ images, fetchImages }) => {
  useEffect(() => {
    fetchImages().catch(e => console.error(e));
  }, []);

  let imageList = [];

  if (images instanceof Array) {
    imageList = images;
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Welcome to [insert name here]!</h1>
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
            Website description: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
            odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna
            nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis
            facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim
            pellentesque felis.
          </p>
          <div>Better divractice</div>
          <div>Video Solution</div>
          <div>Image Front-End Test</div>
          <div>Ace Coding Interview</div>
        </div>
      </div>
    </div>
  );
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Home);
