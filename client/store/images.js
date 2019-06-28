import axios from 'axios';

// action types
export const SET_IMAGES = Symbol('set images');

// action creators
export const setImages = images => ({ type: SET_IMAGES, images });

// reducer
export const images = (state = [], action) => {
  switch (action.type) {
    case SET_IMAGES:
      return action.images;
    default:
      return state;
  }
};

// thunks
export const fetchImages = () => dispatch => {
  return axios
    .get('/api/images')
    .then(res => res.data)
    .then(images => dispatch(setImages(images)));
};
