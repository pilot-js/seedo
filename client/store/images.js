import axios from 'axios';

export const SET_IMAGES = Symbol('set images');

export const setImages = images => ({ type: SET_IMAGES, images });

export const images = (state = [], action) => {
  switch (action.type) {
    case SET_IMAGES:
      return action.images;
    default:
      return state;
  }
};

export const fetchImages = () => dispatch => {
  return axios
    .get('/api/images')
    .then(res => res.data)
    .then(images => dispatch(setImages(images)));
};
